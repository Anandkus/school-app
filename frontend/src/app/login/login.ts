import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: Auth, private router: Router) {
    this.loginForm = fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  loginSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res && res['status'] === 'Y') {
          const token = res?.token;
          const expiresAt = res?.expiresAt;   // <-- ADD THIS
          if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(res?.user));
            localStorage.setItem("expiresAt", new Date(expiresAt).toISOString());  // FIX
            this.router.navigate(['/dashboard']);
          }
        }
      }, error(error: any) {
        const status = error?.error?.status;
        const errMsg = error?.error?.error || 'Unknown error occurred';
        console.error(`Status: ${status}, Message: ${errMsg}`);
        alert(errMsg);
      }
    })
    this.loginForm.reset();
  }
}
