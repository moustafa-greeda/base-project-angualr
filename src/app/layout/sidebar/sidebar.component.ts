import { Component, Input, Output, EventEmitter, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/service/auth';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule , RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  _auth = inject(AuthService);

  @Input() collapsed = false; // desktop collapsed (icon-only)
  @Input() mobileOpen = false; // mobile overlay
  @Output() closeMobile = new EventEmitter<void>();

  logout() {
    this._auth.logout();
  }
  onCloseMobile() {
    this.closeMobile.emit();
  }
}
