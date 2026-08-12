import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth';
import { PermissionService } from './permission.service';

/**
 * Blocks a route unless the user holds the permission, sending them to
 * /not-authorized otherwise.
 *
 *   {
 *     path: 'payrolls',
 *     canActivate: [permissionGuard('payrolls.view')],
 *     loadComponent: () => ...,
 *   }
 */
export function permissionGuard(...required: string[]): CanActivateFn {
  return () => {
    const platformId = inject(PLATFORM_ID);
    const router = inject(Router);
    const auth = inject(AuthService);
    const permissions = inject(PermissionService);

    // let SSR render; the browser re-runs the guard with real storage
    if (!isPlatformBrowser(platformId)) return true;

    if (!auth.user()) return router.createUrlTree(['/login']);

    return permissions.checkAny(required) ? true : router.createUrlTree(['/not-authorized']);
  };
}
