import { DestroyRef, EnvironmentInjector, inject, Injectable, OnDestroy, Signal, signal } from "@angular/core";
import { Message } from "../models/message";
import { HttpClient } from "@angular/common/http";
import {webSocket} from 'rxjs/webSocket';
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { concat, delay, map, merge, scan, Subject, Subscription, takeLast, takeUntil, timeout, timer } from "rxjs";


@Injectable()
export class ChatService {
    private http = inject(HttpClient);

    private baseUrl = 'http://localhost:7000/messages';
    private wsUrl = 'ws://localhost:7000/chat';

    private ws$ = webSocket<Message>(this.wsUrl);
    public messages!: Signal<Message[]>;

    public getMessages() {
        const initial = this.http.get<Message[]>(this.baseUrl);
        const incoming = this.ws$.pipe(takeUntilDestroyed(), map(x => [x]))
        const tmp = concat(initial, incoming).pipe(scan((a, x) => [...a, ...x], [] as Message[]));
        this.messages = toSignal(tmp, {initialValue: []});
    }

    public addMessage(message: Message) {
        this.ws$.next(message);
        // this.http.post<Message>(this.baseUrl, message).subscribe();
    }
}