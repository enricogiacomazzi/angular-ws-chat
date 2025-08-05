import { Component, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'ng-new-messsage',
  imports: [ReactiveFormsModule],
  templateUrl: './new-messsage.html',
  styleUrl: './new-messsage.scss'
})
export class NewMesssage {
  sendMessage = output<string>();
  protected message = new FormControl('', Validators.required);
  protected invalid = toSignal(this.message.statusChanges.pipe(map(x => x !== 'VALID')), {initialValue: true});

  send() {
    if(!this.invalid()) {
      this.sendMessage.emit(this.message.value!);
      this.message.reset();
    }
  }
}
