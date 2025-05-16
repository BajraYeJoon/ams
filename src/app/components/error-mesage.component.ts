import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import type { AbstractControl } from '@angular/forms';

@Component({
  selector: 'common-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="control && control.touched && control.invalid"
      class="text-destructive text-xs"
    >
      <ng-container *ngFor="let error of errorKeys">
        <div *ngIf="control.hasError(error)">
          {{ errorMessages[error] }}
        </div>
      </ng-container>
    </div>
  `,
})
export class CommonErrorMessageComponent {
  @Input() control!: AbstractControl | null;
  @Input() errorMessages: { [key: string]: string } = {};

  get errorKeys() {
    return Object.keys(this.errorMessages);
  }
}
