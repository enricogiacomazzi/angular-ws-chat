import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyWs from '@fastify/websocket';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import {createWebSocketStream} from 'ws';
import { IncomingMessage } from './message';
import { nanoid } from 'nanoid'
import InitStore, {Store} from './store';




const app = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty'
        }
    }
}).withTypeProvider<ZodTypeProvider>();

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


await app.register(fastifyCors);
await app.register(fastifyWs);
await app.register(InitStore);

// @ts-ignore
app.get('/messages', async () => (app.store as Store).getMessages());

app.post('/messages', {schema: {body: IncomingMessage}}, async (req, res) => {
    // @ts-ignore
    return (app.store as Store).addMessage(req.body);
});

app.get('/chat', {websocket: true}, async (connection, req) => {
    const userId = nanoid();
    app.log.info(`User ${userId} connected`);

    // @ts-ignore
    const store = app.store as Store;

    for await(const data of createWebSocketStream(connection)) { 
        try {
            const msg = IncomingMessage.parse(JSON.parse(data.toString()));
            store.addMessage(msg);
        }
        catch(e) {
            app.log.warn(`ws malformed message: ${e.message}`);
        }
    }

    app.log.info(`User ${userId} disconnected`);
});


await app.listen({port: 7000});