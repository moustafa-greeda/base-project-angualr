import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IUser } from './model/Iuser';
import { AuthService } from './service/auth';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class AuthComponent {

  _auth = inject(AuthService);
  _router = inject(Router);
  _fb = inject(FormBuilder);

  isPasswordVisible: boolean = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  loginForm = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    const mockUser: IUser = {
      username: 'admin',
      password: '123',
      userType: 'admin',
    };

    this._auth.login(mockUser);
    this._router.navigateByUrl('/dashboard');
  }
}
