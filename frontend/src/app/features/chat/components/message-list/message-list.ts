import { Component, input } from '@angular/core';
import { Message } from '../../../../models/message';
import { MessageItem } from '../message-item/message-item';

@Component({
  selector: 'ng-message-list',
  imports: [MessageItem],
  templateUrl: './message-list.html',
  styleUrl: './message-list.scss'
})
export class MessageList {
  messages = input.required<Message[]>();
  username = input.required<string>();
}
