import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ng-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: ['']
})
export class App { }
