import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { Button } from '../../../shared/ui/button/button';
import { Badge } from '../../../shared/ui/badge/badge';
import { ToastService } from '../../../shared/ui/toast/toast.service';
import { RolesService } from '../service/roles.service';
import { PermissionsCatalogService } from '../service/permissions.service';
import {
  ACTION_STYLE,
  DEFAULT_ACTION_STYLE,
  IResourceGroup,
  humanize,
} from '../model/role.model';

@Component({
  selector: 'app-role-permissions',
  imports: [PageHeader, Button, Badge],
  templateUrl: './role-permissions.html',
})
export class RolePermissions {
  private service = inject(RolesService);
  private catalog = inject(PermissionsCatalogService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toast = inject(ToastService);

  /** columns come from the data, not from a fixed list */
  actions = this.catalog.actions;

  private roleId = Number(this.route.snapshot.paramMap.get('id'));
  role = this.service.getById(this.roleId);

  /** working copy — only written back to the service on save */
  private selected = signal<Set<string>>(new Set(this.role?.permissions ?? []));

  search = signal('');

  actionLabel = (a: string) => humanize(a);
  actionIcon = (a: string) => (ACTION_STYLE[a] ?? DEFAULT_ACTION_STYLE).icon;

  /** resources grouped by section, filtered by the search box */
  groups = computed(() => {
    const term = this.search().trim().toLowerCase();
    if (!term) return this.catalog.grouped();

    return this.catalog
      .grouped()
      .map((g) => ({
        group: g.group,
        resources: g.resources.filter(
          (r) =>
            r.label.toLowerCase().includes(term) ||
            r.key.includes(term) ||
            g.group.toLowerCase().includes(term),
        ),
      }))
      .filter((g) => g.resources.length > 0);
  });

  selectedCount = computed(() => this.selected().size);
  totalCount = this.catalog.total;

  // ── single permission ────────────────────────
  has(key: string): boolean {
    return this.selected().has(key);
  }

  toggle(resource: IResourceGroup, action: string) {
    const key = `${resource.key}.${action}`;
    const viewKey = `${resource.key}.view`;
    const hasView = resource.permissions.some((p) => p.action === 'view');

    this.selected.update((set) => {
      const next = new Set(set);
      if (next.has(key)) {
        next.delete(key);
        // dropping "view" drops everything else — they are meaningless without it
        if (action === 'view') resource.permissions.forEach((p) => next.delete(p.key));
      } else {
        next.add(key);
        // any other action implies "view", when the resource has one
        if (hasView) next.add(viewKey);
      }
      return next;
    });
  }

  // ── whole row ────────────────────────────────
  rowAll(resource: IResourceGroup): boolean {
    return resource.permissions.every((p) => this.has(p.key));
  }

  rowSome(resource: IResourceGroup): boolean {
    return !this.rowAll(resource) && resource.permissions.some((p) => this.has(p.key));
  }

  rowCount(resource: IResourceGroup): number {
    return resource.permissions.filter((p) => this.has(p.key)).length;
  }

  toggleRow(resource: IResourceGroup) {
    const all = this.rowAll(resource);
    this.selected.update((set) => {
      const next = new Set(set);
      resource.permissions.forEach((p) => (all ? next.delete(p.key) : next.add(p.key)));
      return next;
    });
  }

  // ── group header ─────────────────────────────
  groupAll(resources: IResourceGroup[]): boolean {
    return resources.every((r) => this.rowAll(r));
  }

  toggleGroup(resources: IResourceGroup[]) {
    const all = this.groupAll(resources);
    this.selected.update((set) => {
      const next = new Set(set);
      resources.forEach((r) =>
        r.permissions.forEach((p) => (all ? next.delete(p.key) : next.add(p.key))),
      );
      return next;
    });
  }

  // ── bulk ─────────────────────────────────────
  selectAll() {
    this.selected.set(new Set(this.catalog.allKeys()));
  }

  clearAll() {
    this.selected.set(new Set());
  }

  save() {
    if (!this.role) return;
    this.service.updatePermissions(this.role.id, [...this.selected()]);
    this.toast.success(`Permissions for "${this.role.name}" were saved`);
    this.router.navigate(['/dashboard/roles']);
  }

  cancel() {
    this.router.navigate(['/dashboard/roles']);
  }
}
