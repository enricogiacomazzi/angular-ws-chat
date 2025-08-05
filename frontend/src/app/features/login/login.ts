import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  protected frm = this.fb.group({
    username: ['', Validators.required]
  });


  protected login() {
    this.router.navigateByUrl(`/chat/${this.frm.value.username!}`);
  }
}
