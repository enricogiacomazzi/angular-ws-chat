import { Component, computed, effect, inject, input, OnInit, Signal } from '@angular/core';
import { Navbar } from "./components/navbar/navbar";
import { MessageList } from "./components/message-list/message-list";
import { NewMesssage } from "./components/new-messsage/new-messsage";
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'ng-chat',
  imports: [Navbar, MessageList, NewMesssage],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
  
})
export class Chat {
  protected username = input.required<string>();
  private chatService = inject(ChatService);
  protected messages = computed(() => this.chatService.messages());

  constructor() {
    this.chatService.getMessages();
  }

  public sendMessage(message: string) {
    this.chatService.addMessage({text: message, username: this.username()});
  }

}
