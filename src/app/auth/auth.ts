import { Component, inject } from '@angular/core';
import { IUser } from './model/Iuser';
import { AuthService } from './service/auth';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class AuthComponent {

  ROLE_REDIRECT_MAP = {
    admin: '/dashboard/admin',
    user: '/dashboard/user',
    sales: '/dashboard/sales',
    telesales: '/dashboard/telesales',
    accountant: '/dashboard/accountant',
  };

  _auth = inject(AuthService);
  _router = inject(Router);
  _fb = inject(FormBuilder);

  loginForm = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  onSubmit() {
    const mockUser: IUser = {
      username: 'telesales',
      password: '123',
      userType: 'telesales',
    };

    this._auth.login(mockUser);
    this._router.navigateByUrl(this.ROLE_REDIRECT_MAP[mockUser.userType], { replaceUrl: true });
  }
}
