import { inject, Injectable, signal } from '@angular/core';
import { IRole } from '../model/role.model';
import { PermissionsCatalogService } from './permissions.service';

@Injectable({ providedIn: 'root' })
export class RolesService {
  private catalog = inject(PermissionsCatalogService);

  private _roles = signal<IRole[]>([
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full access to every part of the system',
      usersCount: 2,
      permissions: [], // filled below — every key in the catalog
      system: true,
    },
    {
      id: 2,
      name: 'Operations Manager',
      description: 'Manages contracts, employees and daily operations',
      usersCount: 5,
      permissions: [
        'dashboard.view',
        'contracts.view', 'contracts.create', 'contracts.update', 'contracts.approve',
        'contracts.print',
        'contract-requests.view', 'contract-requests.create', 'contract-requests.approve',
        'employees.view', 'employees.create', 'employees.update', 'employees.assign',
        'work-schedules.view', 'work-schedules.update', 'work-schedules.assign',
        'clients.view',
      ],
    },
    {
      id: 3,
      name: 'Accountant',
      description: 'Access to invoices, payroll and financial reports',
      usersCount: 3,
      permissions: [
        'dashboard.view',
        'reports.view', 'reports.export', 'reports.print',
        'sales-invoices.view', 'sales-invoices.create', 'sales-invoices.update',
        'sales-invoices.send', 'sales-invoices.print',
        'purchase-invoices.view', 'purchase-invoices.create',
        'treasuries.view', 'treasuries.update',
        'payrolls.view', 'payrolls.create', 'payrolls.export',
      ],
    },
    {
      id: 4,
      name: 'HR Specialist',
      description: 'Manages employees, CVs and offers',
      usersCount: 4,
      permissions: [
        'dashboard.view',
        'employees.view', 'employees.create', 'employees.update', 'employees.export',
        'cvs.view', 'cvs.create', 'cvs.update',
        'offers.view', 'offers.create',
        'work-schedules.view',
      ],
    },
    {
      id: 5,
      name: 'Viewer',
      description: 'Read-only access to reports and dashboards',
      usersCount: 8,
      permissions: ['dashboard.view', 'reports.view', 'contracts.view', 'employees.view'],
    },
  ]);

  roles = this._roles.asReadonly();

  constructor() {
    // super admin always holds everything the catalog declares
    this._roles.update((list) =>
      list.map((r) => (r.id === 1 ? { ...r, permissions: this.catalog.allKeys() } : r)),
    );
  }

  getById(id: number): IRole | undefined {
    return this._roles().find((r) => r.id === id);
  }

  save(role: IRole) {
    this._roles.update((list) =>
      list.some((r) => r.id === role.id)
        ? list.map((r) => (r.id === role.id ? role : r))
        : [...list, { ...role, id: Math.max(0, ...list.map((x) => x.id)) + 1 }],
    );
  }

  updatePermissions(id: number, permissions: string[]) {
    this._roles.update((list) => list.map((r) => (r.id === id ? { ...r, permissions } : r)));
  }

  remove(id: number) {
    this._roles.update((list) => list.filter((r) => r.id !== id));
  }
}
