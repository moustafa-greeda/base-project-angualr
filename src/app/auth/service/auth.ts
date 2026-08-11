import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { IUser } from '../model/Iuser';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _router = inject(Router);
  private _user = signal<IUser | null>(null);
  user = this._user.asReadonly();
  private platformId = inject(PLATFORM_ID);
  isLogged = computed(() => !!this._user());

  private readonly ROLE_ROUTES: Record<string, string> = {
    admin: '/dashboard/admin',
    hr: '/dashboard/hr',
    legal: '/dashboard/legal',
    finance: '/dashboard/finance',
    operation: '/dashboard/operation',
  };

  /** landing page for a role; falls back to the admin dashboard */
  getRedirectUrl(role: string): string {
    return this.ROLE_ROUTES[role] ?? '/dashboard/admin';
  }

  constructor() {
    // ✅ اقرأ من localStorage بس في المتصفح
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');

      if (user) {
        const parsedUser: IUser = JSON.parse(user);
        this._user.set(parsedUser);
      }
    }
  }

  login(user: IUser) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
    this._user.set(user);
  }

  logout() {
    this._user.set(null);
    this._router.navigateByUrl('/login');
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
  }
}
