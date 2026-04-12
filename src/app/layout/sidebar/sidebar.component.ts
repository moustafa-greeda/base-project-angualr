import { Component, OnInit, ViewEncapsulation, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/service/auth';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  _auth = inject(AuthService);
  _router = inject(Router);
  collapsed = input(false); // desktop collapsed (icon-only)
  mobileOpen = input(false); // mobile overlay
  closeMobile = output();

  ngOnInit() {
    this._router.events.subscribe(() => {
      this.closeMobile.emit();
    });
  }

  logout() {
    this._auth.logout();
  }
  onCloseMobile() {
    this.closeMobile.emit();
  }
}
