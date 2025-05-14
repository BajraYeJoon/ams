import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { provideHttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (res) => {
          //store the access and refresh tokens in cookies
          document.cookie = `accessToken=${res.data.accessToken}; path=/;`;
          document.cookie = `refreshToken=${res.data.refreshToken}; path=/;`;
          this.error = null;
        },
        error: (err) => {
          // Try to extract API error structure
          const apiError = err?.error;
          if (apiError && typeof apiError === 'object') {
            // Show main message
            this.error = apiError.message || 'Login failed';
            // Optionally, set field errors
            if (apiError.errors) {
              // Set errors on form controls
              Object.keys(apiError.errors).forEach((field) => {
                const control = this.loginForm.get(field.toLowerCase());
                if (control) {
                  control.setErrors({ api: apiError.errors[field][0] });
                }
              });
            }
          } else {
            // Fallback for unknown error format
            this.error = 'Login failed. Please try again.';
          }
        },
      });
    }
  }
}
