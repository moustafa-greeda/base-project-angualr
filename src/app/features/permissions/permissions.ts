import { Component, computed, inject, signal } from '@angular/core';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { Badge, BadgeVariant } from '../../shared/ui/badge/badge';
import { Button } from '../../shared/ui/button/button';
import { RolesService } from '../roles/service/roles.service';
import { PermissionsCatalogService } from '../roles/service/permissions.service';
import { ACTION_STYLE, DEFAULT_ACTION_STYLE, humanize } from '../roles/model/role.model';

@Component({
  selector: 'app-permissions',
  imports: [PageHeader, Badge, Button],
  templateUrl: './permissions.html',
})
export class Permissions {
  private rolesService = inject(RolesService);
  private catalog = inject(PermissionsCatalogService);

  roles = this.rolesService.roles;
  /** every distinct action the backend declared, used as filter chips */
  actions = this.catalog.actions;

  search = signal('');
  /** '' means "all actions" */
  actionFilter = signal<string>('');

  actionVariant = (a: string) =>
    (ACTION_STYLE[a] ?? DEFAULT_ACTION_STYLE).variant as BadgeVariant;
  actionIcon = (a: string) => (ACTION_STYLE[a] ?? DEFAULT_ACTION_STYLE).icon;
  actionLabel = (a: string) => humanize(a);

  /** roles holding a given permission key */
  rolesFor(key: string) {
    return this.roles().filter((r) => r.permissions.includes(key));
  }

  /** first letters of a role name, for the small round markers */
  roleInitials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join('');
  }

  /** how many permissions in a resource are granted to nobody */
  unassignedIn(permissions: { key: string }[]): number {
    return permissions.filter((p) => !this.rolesFor(p.key).length).length;
  }

  /** headline numbers shown above the list */
  stats = computed(() => {
    const granted = new Set(this.roles().flatMap((r) => r.permissions));
    const all = this.catalog.parsed();
    return {
      resources: this.catalog.resources().length,
      actions: this.actions().length,
      unassigned: all.filter((p) => !granted.has(p.key)).length,
    };
  });

  /** resources with their own permissions, filtered by search + action */
  groups = computed(() => {
    const term = this.search().trim().toLowerCase();
    const action = this.actionFilter();

    return this.catalog
      .grouped()
      .map((g) => ({
        group: g.group,
        resources: g.resources
          .filter(
            (r) =>
              !term ||
              r.label.toLowerCase().includes(term) ||
              r.key.includes(term) ||
              g.group.toLowerCase().includes(term),
          )
          .map((r) => ({
            ...r,
            permissions: r.permissions.filter((p) => !action || p.action === action),
          }))
          .filter((r) => r.permissions.length > 0),
      }))
      .filter((g) => g.resources.length > 0);
  });

  totalPermissions = this.catalog.total;

  /** how many permissions are granted to at least one role */
  usedCount = computed(() => new Set(this.roles().flatMap((r) => r.permissions)).size);

  setActionFilter(a: string) {
    this.actionFilter.set(a);
  }
}
