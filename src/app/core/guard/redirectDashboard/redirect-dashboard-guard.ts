import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../auth/service/auth';

export const redirectDashboardGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  const _authService = inject(AuthService);

  //  مهم جدًا: لو SSR → سيبه يعدي
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const user = localStorage.getItem('user');
  //  in browser
  if (!user) {
    return router.createUrlTree(['/login']);
  }

  const parsedUser = JSON.parse(user);

  if (state.url === '/dashboard') {
    const targetRoute = _authService.getRedirectUrl(parsedUser.userType);
    return router.createUrlTree([targetRoute]);
  }

  return true;
};
