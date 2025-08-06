import { Component, computed, input } from '@angular/core';
import { Message } from '../../../../models/message';

@Component({
  selector: 'ng-message-item',
  imports: [],
  templateUrl: './message-item.html',
  styleUrl: './message-item.scss',
})
export class MessageItem {
  message = input.required<Message>();
  username = input.required<string>();
  mine = computed(() => this.message().username === this.username());
}
