import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../auth/service/auth';
import { IuserType } from '../../../auth/model/Iuser';

const ROLE_REDIRECT_MAP: Record<IuserType, string> = {
  admin: '/dashboard/admin',
  user: '/dashboard/user',
  sales: '/dashboard/sales',
  telesales: '/dashboard/telesales',
  accountant: '/dashboard/accountant',
};

export const redirectDashboardGuard: CanActivateFn = (route, state) => {
  const _auth = inject(AuthService);
  const _router = inject(Router);
  const user = _auth.user();

  if (!user) {
    return _router.createUrlTree(['/login']);
    // return true; // سيبه يدخل login
  }

  // const redirectBath = ROLE_REDIRECT_MAP[user.userType];

  // return _router.createUrlTree([redirectBath]);
    return true; // ✨ يسمح

};
