import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './service/auth';
import { ToastService } from '../shared/ui/toast/toast.service';
import { Button } from '../shared/ui/button/button';
import { IMockAccount, MOCK_USERS, findMockUser } from './mock/mock-users';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './auth.html',
})
export class AuthComponent {
  private _auth = inject(AuthService);
  private _router = inject(Router);
  private _fb = inject(FormBuilder);
  private _toast = inject(ToastService);

  demoAccounts = MOCK_USERS;

  isPasswordVisible = signal(false);
  loading = signal(false);
  /** message shown in the form when credentials do not match */
  error = signal('');

  loginForm = this._fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [true],
  });

  /** field-level messages, only after the field was touched */
  usernameError = computed(() => this.controlError('username', 'Username is required'));
  passwordError = computed(() => this.controlError('password', 'Password is required'));

  private controlError(name: string, requiredMsg: string): string {
    const c = this.loginForm.get(name);
    if (!c || !c.touched || !c.errors) return '';
    if (c.errors['required']) return requiredMsg;
    if (c.errors['minlength']) return 'Password must be at least 6 characters';
    return 'Invalid value';
  }

  togglePasswordVisibility() {
    this.isPasswordVisible.update((v) => !v);
  }

  /** one-click fill from the demo accounts list */
  useAccount(account: IMockAccount) {
    this.loginForm.patchValue({ username: account.username, password: account.password });
    this.error.set('');
  }

  onSubmit() {
    this.error.set('');

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;
    this.loading.set(true);

    // simulates the network round-trip until the API is wired
    setTimeout(() => {
      const account = findMockUser(username!, password!);
      this.loading.set(false);

      if (!account) {
        this.error.set('Wrong username or password');
        this._toast.error('Wrong username or password');
        return;
      }

      const { displayName, description, icon, ...user } = account;
      this._auth.login(user);
      this._toast.success(`Welcome back, ${displayName}`);
      this._router.navigateByUrl(this._auth.getRedirectUrl(user.userType) ?? '/dashboard');
    }, 700);
  }
}
