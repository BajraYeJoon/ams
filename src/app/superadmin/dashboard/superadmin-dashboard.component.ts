import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'superadmin-dashboard',
  imports: [CommonModule],
  template: `
    <div>
      <h1>Superadmin Dashboard</h1>
      <p>Welcome to the Superadmin Dashboard!</p>
      <span>{{ data }}</span>
    </div>
  `,
})
export class SuperadminDashboardComponent {
  data = 'This is some data';
}
