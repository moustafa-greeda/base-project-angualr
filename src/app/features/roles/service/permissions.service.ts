import { computed, Injectable, signal } from '@angular/core';
import {
  IParsedPermission,
  IPermission,
  IResourceGroup,
  RESOURCE_META,
  humanize,
  parsePermission,
} from '../model/role.model';

/**
 * Mock of what `GET /api/permissions` returns: a flat list where each model
 * declares its own actions — including custom ones like approve/disburse.
 */
const API_PERMISSIONS: IPermission[] = [
  { key: 'dashboard.view' },

  { key: 'roles.view' }, { key: 'roles.create' }, { key: 'roles.update' }, { key: 'roles.delete' },
  { key: 'permissions.view' }, { key: 'permissions.create' },

  { key: 'branches.view' }, { key: 'branches.create' }, { key: 'branches.update' }, { key: 'branches.delete' },
  { key: 'nationalities.view' }, { key: 'nationalities.create' }, { key: 'nationalities.update' },
  { key: 'sponsors.view' }, { key: 'sponsors.create' }, { key: 'sponsors.update' },

  // contracts carry approval + export on top of CRUD
  { key: 'contract-requests.view' }, { key: 'contract-requests.create' },
  { key: 'contract-requests.update' }, { key: 'contract-requests.delete' },
  { key: 'contract-requests.approve' }, { key: 'contract-requests.reject' },
  { key: 'contracts.view' }, { key: 'contracts.create' }, { key: 'contracts.update' },
  { key: 'contracts.delete' }, { key: 'contracts.approve' }, { key: 'contracts.export' },
  { key: 'contracts.print' },
  { key: 'quotations.view' }, { key: 'quotations.create' }, { key: 'quotations.update' },
  { key: 'quotations.send' }, { key: 'quotations.export' },

  { key: 'cvs.view' }, { key: 'cvs.create' }, { key: 'cvs.update' }, { key: 'cvs.delete' },
  { key: 'offers.view' }, { key: 'offers.create' }, { key: 'offers.approve' }, { key: 'offers.reject' },

  { key: 'employees.view' }, { key: 'employees.create' }, { key: 'employees.update' },
  { key: 'employees.delete' }, { key: 'employees.assign' }, { key: 'employees.export' },
  { key: 'users.view' }, { key: 'users.create' }, { key: 'users.update' }, { key: 'users.delete' },
  { key: 'clients.view' }, { key: 'clients.create' }, { key: 'clients.update' },

  // payroll has its own domain actions
  { key: 'payrolls.view' }, { key: 'payrolls.create' }, { key: 'payrolls.approve' },
  { key: 'payrolls.disburse' }, { key: 'payrolls.export' },
  { key: 'work-schedules.view' }, { key: 'work-schedules.update' }, { key: 'work-schedules.assign' },

  { key: 'reports.view' }, { key: 'reports.export' }, { key: 'reports.print' },
  { key: 'sales-invoices.view' }, { key: 'sales-invoices.create' }, { key: 'sales-invoices.update' },
  { key: 'sales-invoices.send' }, { key: 'sales-invoices.void' }, { key: 'sales-invoices.print' },
  { key: 'purchase-invoices.view' }, { key: 'purchase-invoices.create' }, { key: 'purchase-invoices.void' },
  { key: 'treasuries.view' }, { key: 'treasuries.update' },

  { key: 'audit-logs.view' }, { key: 'audit-logs.export' },
];

@Injectable({ providedIn: 'root' })
export class PermissionsCatalogService {
  /** raw list as received from the API */
  private _permissions = signal<IPermission[]>(API_PERMISSIONS);

  /** parsed into { key, resource, action } */
  parsed = computed<IParsedPermission[]>(() => this._permissions().map(parsePermission));

  /**
   * Matrix columns — every distinct action present in the data, with the
   * common CRUD ones kept first so the table reads naturally.
   */
  actions = computed<string[]>(() => {
    const order = ['view', 'create', 'update', 'delete'];
    const found = [...new Set(this.parsed().map((p) => p.action))];
    return [
      ...order.filter((a) => found.includes(a)),
      ...found.filter((a) => !order.includes(a)).sort(),
    ];
  });

  /** resources, each carrying only the actions the backend declared for it */
  resources = computed<IResourceGroup[]>(() => {
    const byResource = new Map<string, IParsedPermission[]>();
    this.parsed().forEach((p) =>
      byResource.set(p.resource, [...(byResource.get(p.resource) ?? []), p]),
    );

    return [...byResource.entries()].map(([key, permissions]) => {
      const meta = RESOURCE_META[key];
      return {
        key,
        label: meta?.label ?? humanize(key),
        icon: meta?.icon ?? 'bi bi-box',
        group: meta?.group ?? 'Other',
        permissions,
      };
    });
  });

  /** resources bucketed by their display group */
  grouped = computed(() => {
    const map = new Map<string, IResourceGroup[]>();
    this.resources().forEach((r) => map.set(r.group, [...(map.get(r.group) ?? []), r]));
    return [...map.entries()].map(([group, resources]) => ({ group, resources }));
  });

  /** every permission key in the system */
  allKeys = computed(() => this.parsed().map((p) => p.key));

  total = computed(() => this._permissions().length);

  /** does this resource declare this action? */
  supports(resource: string, action: string): boolean {
    return this.parsed().some((p) => p.resource === resource && p.action === action);
  }

  /** replace the catalog once the real API is wired */
  setPermissions(list: IPermission[]) {
    this._permissions.set(list);
  }
}
