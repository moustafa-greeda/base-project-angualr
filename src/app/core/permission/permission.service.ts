import { computed, inject, Injectable } from '@angular/core';
import { AuthService } from '../../auth/service/auth';
import { RolesService } from '../../features/roles/service/roles.service';

/**
 * Answers "can the signed-in user do X?" for the whole app.
 *
 *   private can = inject(PermissionService);
 *   if (this.can.check('contracts.delete')) { ... }
 *
 * In templates prefer the *appCan directive.
 */
@Injectable({ providedIn: 'root' })
export class PermissionService {
  private auth = inject(AuthService);
  private rolesService = inject(RolesService);

  /**
   * Permission keys of the current user.
   * For now they come from the role matching the user's type; once the API
   * returns them on the user object, read that instead.
   */
  permissions = computed<string[]>(() => {
    const user = this.auth.user();
    if (!user) return [];

    // admin bypasses everything
    if (user.userType === 'admin') return ['*'];

    const role = this.rolesService
      .roles()
      .find((r) => r.name.toLowerCase().replace(/\s+/g, '') === user.userType.toLowerCase());

    return role?.permissions ?? [];
  });

  private granted = computed(() => new Set(this.permissions()));

  /** true when the user holds this permission (supports "*" and "resource.*") */
  check(permission: string): boolean {
    const set = this.granted();
    if (set.has('*')) return true; // super admin
    if (set.has(permission)) return true;

    const resource = permission.split('.')[0];
    return set.has(`${resource}.*`);
  }

  /** true when the user holds at least one of them */
  checkAny(permissions: string[]): boolean {
    return permissions.some((p) => this.check(p));
  }

  /** true when the user holds all of them */
  checkAll(permissions: string[]): boolean {
    return permissions.every((p) => this.check(p));
  }
}
