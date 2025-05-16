import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonInputComponent } from '../../ui/common-input.component';
import { CommonButtonComponent } from '../../ui/common-button.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CommonInputComponent,
    CommonButtonComponent,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(32)]],
      lastName: ['', [Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
        ],
      ],
      termsAccepted: [false, [Validators.requiredTrue]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      this.authService.register(formValue).subscribe({
        next: (res) => {
          // Handle successful registration
          this.error = null;
        },
        error: (err) => {
          // Handle registration error
          this.error =
            err?.error?.message || 'Registration failed. Please try again.';
        },
      });
    }
  }
}
