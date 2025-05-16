import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [ngClass]="buttonClass"
      [attr.aria-label]="ariaLabel"
      [attr.data-test]="dataTest"
      class="btn-primary"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class CommonButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() buttonClass?: string;
  @Input() ariaLabel?: string;
  @Input() dataTest?: string;
}
