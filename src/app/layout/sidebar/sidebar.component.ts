import { Component, DestroyRef, ViewEncapsulation, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/service/auth';
import { Router, RouterModule } from '@angular/router';
import { SIDEBAR_MENU } from './sidebar.config';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  _auth = inject(AuthService);
  _router = inject(Router);
  _destroyRef = inject(DestroyRef);
  collapsed = input(false); // desktop collapsed (icon-only)
  mobileOpen = input(false); // mobile overlay
  closeMobile = output();
  _serviceAuth = inject(AuthService);

  menu: any[] = [];

  ngOnInit() {
    const user = this._serviceAuth.user();
    if (!user) return;
    this.menu = SIDEBAR_MENU[user.userType] || [];
  }

  logout() {
    this._auth.logout();
  }
  onCloseMobile() {
    this.closeMobile.emit();
  }
}
