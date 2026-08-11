/**
 * A single permission exactly as the backend defines it.
 * The key is authoritative: "<resource>.<action>", e.g. "contracts.approve".
 */
export interface IPermission {
  key: string;
  /** human label; falls back to a prettified action when missing */
  label?: string;
}

/** parsed form used by the UI */
export interface IParsedPermission extends IPermission {
  resource: string;
  action: string;
}

/** a resource with only the actions it actually supports */
export interface IResourceGroup {
  key: string;
  label: string;
  icon: string;
  group: string;
  permissions: IParsedPermission[];
}

/** metadata for display; resources missing from here still render with defaults */
export interface IResourceMeta {
  label: string;
  icon: string;
  group: string;
}

export interface IRole {
  id: number;
  name: string;
  description: string;
  usersCount: number;
  /** full permission keys held by this role */
  permissions: string[];
  system?: boolean;
}

/** "contracts.approve" → { resource: 'contracts', action: 'approve' } */
export function parsePermission(p: IPermission): IParsedPermission {
  const idx = p.key.indexOf('.');
  const resource = idx === -1 ? p.key : p.key.slice(0, idx);
  const action = idx === -1 ? 'view' : p.key.slice(idx + 1);
  return { ...p, resource, action };
}

/** "contract-requests" → "Contract Requests" · "disburse" → "Disburse" */
export function humanize(value: string): string {
  return value
    .replace(/[-_.]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

/**
 * Display metadata per resource. Anything the backend sends that is not
 * listed here still shows up, using a generic icon and the "Other" group.
 */
export const RESOURCE_META: Record<string, IResourceMeta> = {
  dashboard: { label: 'Dashboard', icon: 'bi bi-house-door', group: 'General' },
  roles: { label: 'Roles', icon: 'bi bi-person-badge', group: 'Access Control' },
  permissions: { label: 'Permissions', icon: 'bi bi-key', group: 'Access Control' },
  branches: { label: 'Branches', icon: 'bi bi-diagram-3', group: 'Settings' },
  nationalities: { label: 'Nationalities', icon: 'bi bi-globe2', group: 'Settings' },
  sponsors: { label: 'Sponsors', icon: 'bi bi-person-heart', group: 'Settings' },
  'contract-requests': {
    label: 'Contract Requests',
    icon: 'bi bi-file-earmark-plus',
    group: 'Contracts',
  },
  contracts: { label: 'Contracts', icon: 'bi bi-file-earmark-check', group: 'Contracts' },
  quotations: { label: 'Quotations', icon: 'bi bi-receipt', group: 'Contracts' },
  cvs: { label: 'CVs', icon: 'bi bi-person-lines-fill', group: 'CVs & Offers' },
  offers: { label: 'Offers', icon: 'bi bi-briefcase', group: 'CVs & Offers' },
  employees: { label: 'Employees', icon: 'bi bi-person-workspace', group: 'Members' },
  users: { label: 'Users', icon: 'bi bi-person-gear', group: 'Members' },
  clients: { label: 'Clients', icon: 'bi bi-person-check', group: 'Members' },
  payrolls: { label: 'Payrolls', icon: 'bi bi-wallet2', group: 'Payroll' },
  'work-schedules': { label: 'Work Schedules', icon: 'bi bi-calendar-week', group: 'Payroll' },
  reports: { label: 'Reports', icon: 'bi bi-bar-chart', group: 'Accounting' },
  'sales-invoices': { label: 'Sales Invoices', icon: 'bi bi-receipt-cutoff', group: 'Accounting' },
  'purchase-invoices': { label: 'Purchase Invoices', icon: 'bi bi-bag', group: 'Accounting' },
  treasuries: { label: 'Treasuries', icon: 'bi bi-safe', group: 'Accounting' },
  'audit-logs': { label: 'Audit Logs', icon: 'bi bi-list-check', group: 'Logs' },
};

/** color + icon per action; unknown actions fall back to a neutral look */
export const ACTION_STYLE: Record<string, { variant: string; icon: string }> = {
  view: { variant: 'info', icon: 'bi bi-eye' },
  create: { variant: 'success', icon: 'bi bi-plus-lg' },
  update: { variant: 'warning', icon: 'bi bi-pencil' },
  delete: { variant: 'danger', icon: 'bi bi-trash' },
  approve: { variant: 'success', icon: 'bi bi-check2-circle' },
  reject: { variant: 'danger', icon: 'bi bi-x-circle' },
  export: { variant: 'primary', icon: 'bi bi-download' },
  import: { variant: 'primary', icon: 'bi bi-upload' },
  print: { variant: 'neutral', icon: 'bi bi-printer' },
  send: { variant: 'info', icon: 'bi bi-send' },
  void: { variant: 'danger', icon: 'bi bi-slash-circle' },
  disburse: { variant: 'warning', icon: 'bi bi-cash-coin' },
  assign: { variant: 'info', icon: 'bi bi-person-plus' },
  restore: { variant: 'success', icon: 'bi bi-arrow-counterclockwise' },
};

export const DEFAULT_ACTION_STYLE = { variant: 'neutral', icon: 'bi bi-dot' };
