import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../auth/service/auth';

/** keeps signed-in users out of /login, sending them to their own dashboard */
export const loginGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.user();
  if (!user) return true;

  return router.createUrlTree([auth.getRedirectUrl(user.userType)]);
};
