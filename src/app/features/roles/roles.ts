import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { Badge } from '../../shared/ui/badge/badge';
import { Button } from '../../shared/ui/button/button';
import { ToastService } from '../../shared/ui/toast/toast.service';
import { RolesService } from './service/roles.service';
import { PermissionsCatalogService } from './service/permissions.service';
import { IRole, RESOURCE_META, humanize } from './model/role.model';

/** rotating accent colors so role cards are visually distinct */
const ACCENTS = ['--primary', '--info', '--warning', '--success', '--danger'];

@Component({
  selector: 'app-roles',
  imports: [PageHeader, Badge, Button],
  templateUrl: './roles.html',
})
export class Roles {
  private service = inject(RolesService);
  private catalog = inject(PermissionsCatalogService);
  private router = inject(Router);
  private toast = inject(ToastService);

  search = signal('');

  roles = computed(() => {
    const term = this.search().trim().toLowerCase();
    return this.service
      .roles()
      .filter(
        (r) =>
          !term ||
          r.name.toLowerCase().includes(term) ||
          r.description.toLowerCase().includes(term),
      );
  });

  totalPermissions = this.catalog.total;

  stats = computed(() => ({
    roles: this.service.roles().length,
    users: this.service.roles().reduce((sum, r) => sum + r.usersCount, 0),
    permissions: this.catalog.total(),
  }));

  accent = (index: number) => `var(${ACCENTS[index % ACCENTS.length]})`;

  /** share of all permissions this role holds */
  coverage(role: IRole): number {
    const total = this.totalPermissions();
    return total ? Math.round((role.permissions.length / total) * 100) : 0;
  }

  /** distinct resources the role can touch, as readable labels */
  resourceLabels(role: IRole): string[] {
    const keys = [...new Set(role.permissions.map((p) => p.split('.')[0]))];
    return keys.map((k) => RESOURCE_META[k]?.label ?? humanize(k));
  }

  initials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join('');
  }

  openPermissions(role: IRole) {
    this.router.navigate(['/dashboard/roles', role.id, 'permissions']);
  }

  onDelete(role: IRole) {
    if (role.system) {
      this.toast.warning(`"${role.name}" is a system role and cannot be deleted`);
      return;
    }
    this.service.remove(role.id);
    this.toast.success(`Role "${role.name}" was deleted`);
  }
}
