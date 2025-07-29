import Fastify, { FastifyRequest } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyWs from '@fastify/websocket';
import {createWebSocketStream} from 'ws';
import { Message, MessagePayload } from './message';


const app = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty'
        }
    }
});


await app.register(fastifyCors);
await app.register(fastifyWs);


app.decorate('messages', [] as Array<Message>);

app.get('/chat/:username', {websocket: true}, async (connection, req) => {
    // @ts-ignore
    const username = req.params.username;
    app.log.info(`User ${username} connected`);


    // @ts-ignore
    connection.send(JSON.stringify(app.messages));

    for await(const data of createWebSocketStream(connection)) {
        try {
            const payload = MessagePayload.parse(JSON.parse(data.toString()));
            const timestamp =  new Date().getTime();
            const msg: Message = { timestamp, username, payload };

            // @ts-ignore
            app.messages.push(msg);
            const raw = JSON.stringify([msg]);

            for (const client of app.websocketServer.clients) {
                client.send(raw);
            }
        } catch {}
    }

    app.log.info(`User ${username} disconnected`);

});


await app.listen({port: 7000});