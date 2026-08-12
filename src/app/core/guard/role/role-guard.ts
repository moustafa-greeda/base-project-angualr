import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../auth/service/auth';
import { IuserType } from '../../../auth/model/Iuser';

/**
 * Blocks a route unless the signed-in user has one of the allowed roles,
 * sending them to /not-authorized otherwise.
 *
 *   {
 *     path: 'payrolls',
 *     canActivate: [roleGuard(['admin', 'finance'])],
 *     loadComponent: () => ...
 *   }
 */
export function roleGuard(allowed: IuserType[]): CanActivateFn {
  return () => {
    const platformId = inject(PLATFORM_ID);
    const router = inject(Router);
    const auth = inject(AuthService);

    // let SSR render; the browser re-runs the guard
    if (!isPlatformBrowser(platformId)) return true;

    const user = auth.user();
    if (!user) return router.createUrlTree(['/login']);

    return allowed.includes(user.userType) ? true : router.createUrlTree(['/not-authorized']);
  };
}
