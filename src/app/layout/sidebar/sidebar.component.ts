import { Component, ViewEncapsulation, inject, input, output } from '@angular/core';
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

  collapsed = input( false); // desktop collapsed (icon-only)
  mobileOpen = input(false); // mobile overlay
  // closeMobile = new EventEmitter<void>();
  closeMobile = output()

  logout() {
    this._auth.logout();
  }
  onCloseMobile() {
    this.closeMobile.emit();
  }
}
