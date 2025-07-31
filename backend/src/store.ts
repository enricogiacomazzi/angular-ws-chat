
import { EventEmitter } from 'node:events';
import { Message } from './message';
import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';



export class Store {
    private _messages: Message[] = [];

    constructor(private app: FastifyInstance) { }

    public getMessages() {
        return this._messages;
    };

    public addMessage(message: Omit<Message, 'timestamp'>) {
        const tmp: Message = {...message, timestamp: new Date().getTime()};
        this._messages.push(tmp);
        this.broadcast(tmp);
        return tmp;
    }

    private broadcast(message: Message) {
        const raw = JSON.stringify(message);
        for (const client of this.app.websocketServer.clients) {
            client.send(raw);
        }
    }
}



export default fp(async function (app: FastifyInstance, opts: unknown) {    
    app.decorate('store', new Store(app));
});