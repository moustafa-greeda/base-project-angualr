import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../auth/service/auth';
import { IuserType } from '../../../auth/model/Iuser';

export const loginGuard: CanActivateFn = (route, state) => {
  const ROLE_REDIRECT_MAP : Record<IuserType, string>= {
    admin: '/dashboard/admin',
    user: '/dashboard/user',
    sales: '/dashboard/sales',
    telesales: '/dashboard/telesales',
    accountant: '/dashboard/accountant',
  };
  const _auth = inject(AuthService);
  const _router = inject(Router);
  const _user = _auth.user();

  if (_user) {
    const redirectPath = ROLE_REDIRECT_MAP[_user.userType];
    return _router.createUrlTree([redirectPath]);
  }
  return true;
};
