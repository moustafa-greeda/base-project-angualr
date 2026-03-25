import { computed, inject, Injectable, signal } from '@angular/core';
import { IUser } from '../model/Iuser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _router = inject(Router);
  private _user = signal<IUser | null>(null);
  user = this._user.asReadonly();

  isLogged = computed(() => !!this._user());

  login(user: IUser) {
    this._user.set(user);
  }

  logout() {
    this._user.set(null);
    this._router.navigateByUrl('/login');
  }
}
