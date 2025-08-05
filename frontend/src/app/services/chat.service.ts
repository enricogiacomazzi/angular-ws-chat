import { inject, Injectable, signal } from "@angular/core";
import { Message } from "../models/message";
import { HttpClient } from "@angular/common/http";


@Injectable({providedIn: 'root'})
export class ChatService {
    private http = inject(HttpClient);
    private _messages = signal<Message[]>([]);
    public messages = this._messages.asReadonly();

    private baseUrl = 'http://localhost:7000/messages';
    private wsUrl = 'ws://localhost:7000/chat';

    public getMessages() {
        this.http.get<Message[]>(this.baseUrl).subscribe(x => {
            this._messages.set(x);
        });
    }

    public addMessage(message: Message) {
        this.http.post<Message>(this.baseUrl, message).subscribe(x => {
            console.log('add message', x);
        });
    }
}