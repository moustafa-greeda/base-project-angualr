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
