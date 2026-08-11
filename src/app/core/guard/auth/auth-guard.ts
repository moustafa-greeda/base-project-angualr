import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../auth/service/auth';

/**
 * Guards the dashboard shell:
 * - not signed in            → /login
 * - landed on bare /dashboard → the landing page of their role
 */
export const authGuard: CanActivateFn = (_route, state) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  const auth = inject(AuthService);

  // let SSR render; the browser re-runs the guard with real storage
  if (!isPlatformBrowser(platformId)) return true;

  const user = auth.user();
  if (!user) return router.createUrlTree(['/login']);

  if (state.url === '/dashboard' || state.url === '/dashboard/') {
    return router.createUrlTree([auth.getRedirectUrl(user.userType)]);
  }

  return true;
};
