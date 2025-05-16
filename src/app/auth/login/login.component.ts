import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonInputComponent } from '../../ui/common-input.component';
import { CommonButtonComponent } from '../../ui/common-button.component';
import { CommonErrorMessageComponent } from '../../components/error-mesage.component';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CommonInputComponent,
    CommonButtonComponent,
    CommonErrorMessageComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(64)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (res) => {
          //store the access and refresh tokens in cookies
          // document.cookie = `accessToken=${res.data.accessToken}; path=/;`;
          // document.cookie = `refreshToken=${res.data.refreshToken}; path=/;`;
          this.cookieService.set('accessToken', res.data.accessToken, {
            path: '/',
          });
          this.cookieService.set('refreshToken', res.data.refreshToken, {
            path: '/',
          });
          this.error = null;
          this.router.navigate(['/dashboard']);
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
