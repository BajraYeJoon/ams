import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-common-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <label
      *ngIf="label"
      [for]="id"
      class="block text-sm font-medium text-gray-700"
      >{{ label }}</label
    >
    <input
      [id]="id"
      [type]="type"
      [placeholder]="placeholder"
      [formControl]="control"
      [ngClass]="inputClass"
      class="input"
    />
  `,
})
export class CommonInputComponent {
  @Input() id?: string;
  @Input() label?: string;
  @Input() type?: string;
  @Input() placeholder?: string;
  @Input() control: any;
  @Input() inputClass?: string;
}
