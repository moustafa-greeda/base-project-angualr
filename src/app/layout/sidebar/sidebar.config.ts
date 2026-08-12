export interface SidebarItem {
  label: string;
  icon: string;
  route: string;
}

export interface SidebarGroup {
  label: string;
  icon: string;
  items: SidebarItem[];
}

export type SidebarEntry = SidebarItem | SidebarGroup;

export function isGroup(entry: SidebarEntry): entry is SidebarGroup {
  return 'items' in entry;
}

export const SIDEBAR_MENU: Record<string, SidebarEntry[]> = {
  admin: [
    { label: 'nav.dashboard', icon: 'bi-house-door', route: '/dashboard/admin' },
    { label: 'nav.profile', icon: 'bi-person-circle', route: '/dashboard/profile' },
    {
      label: 'nav.accessControl',
      icon: 'bi-shield-lock',
      items: [
        { label: 'nav.roles', icon: 'bi-person-badge', route: '/dashboard/roles' },
        { label: 'nav.permissions', icon: 'bi-key', route: '/dashboard/permissions' },
      ],
    },
    {
      label: 'nav.settings',
      icon: 'bi-sliders',
      items: [
        { label: 'nav.branches', icon: 'bi-diagram-3', route: '/dashboard/branches' },
        { label: 'nav.quotationFields', icon: 'bi-input-cursor-text', route: '/dashboard/quotation-fields' },
        { label: 'nav.vacationTypes', icon: 'bi-calendar-event', route: '/dashboard/vacation-types' },
        { label: 'nav.loanTypes', icon: 'bi-cash-coin', route: '/dashboard/loan-types' },
        { label: 'nav.nationalities', icon: 'bi-globe2', route: '/dashboard/nationalities' },
        { label: 'nav.sponsors', icon: 'bi-person-heart', route: '/dashboard/sponsors' },
      ],
    },
    {
      label: 'nav.contractsGroup',
      icon: 'bi-file-earmark-text',
      items: [
        { label: 'nav.contractRequests', icon: 'bi-file-earmark-plus', route: '/dashboard/contract-requests' },
        { label: 'nav.contracts', icon: 'bi-file-earmark-check', route: '/dashboard/contracts' },
        { label: 'nav.quotations', icon: 'bi-receipt', route: '/dashboard/quotations' },
      ],
    },
    {
      label: 'nav.cvsGroup',
      icon: 'bi-file-person',
      items: [
        { label: 'nav.cvRequests', icon: 'bi-file-earmark-person', route: '/dashboard/cv-requests' },
        { label: 'nav.cvs', icon: 'bi-person-lines-fill', route: '/dashboard/cvs' },
        { label: 'nav.offers', icon: 'bi-briefcase', route: '/dashboard/offers' },
      ],
    },
    {
      label: 'nav.members',
      icon: 'bi-people',
      items: [
        { label: 'nav.employees', icon: 'bi-person-workspace', route: '/dashboard/employees' },
        { label: 'nav.users', icon: 'bi-person-gear', route: '/dashboard/users' },
        { label: 'nav.clients', icon: 'bi-person-check', route: '/dashboard/clients' },
      ],
    },
    {
      label: 'nav.payrollGroup',
      icon: 'bi-cash-stack',
      items: [
        { label: 'nav.payrolls', icon: 'bi-wallet2', route: '/dashboard/payrolls' },
        { label: 'nav.workSchedules', icon: 'bi-calendar-week', route: '/dashboard/work-schedules' },
      ],
    },
    {
      label: 'nav.accounting',
      icon: 'bi-calculator',
      items: [
        { label: 'nav.reports', icon: 'bi-bar-chart', route: '/dashboard/reports' },
        { label: 'nav.salesInvoices', icon: 'bi-receipt-cutoff', route: '/dashboard/sales-invoices' },
        { label: 'nav.purchaseInvoices', icon: 'bi-bag', route: '/dashboard/purchase-invoices' },
        { label: 'nav.treasuries', icon: 'bi-safe', route: '/dashboard/treasuries' },
        { label: 'nav.ledger', icon: 'bi-journal-bookmark', route: '/dashboard/ledger' },
        { label: 'nav.advances', icon: 'bi-cash', route: '/dashboard/advances' },
        { label: 'nav.journalEntries', icon: 'bi-journal-text', route: '/dashboard/journal-entries' },
        { label: 'nav.assets', icon: 'bi-building', route: '/dashboard/assets' },
        { label: 'nav.costCenters', icon: 'bi-pie-chart', route: '/dashboard/cost-centers' },
      ],
    },
    {
      label: 'nav.logs',
      icon: 'bi-clock-history',
      items: [{ label: 'nav.auditLogs', icon: 'bi-list-check', route: '/dashboard/audit-logs' }],
    },
    {
      label: 'nav.designSystem',
      icon: 'bi-palette',
      items: [
        { label: 'nav.table', icon: 'bi-table', route: '/dashboard/table' },
        { label: 'nav.buttons', icon: 'bi-square', route: '/dashboard/button' },
        { label: 'nav.forms', icon: 'bi-ui-checks', route: '/dashboard/forms' },
        { label: 'nav.loaders', icon: 'bi-arrow-repeat', route: '/dashboard/loader' },
        { label: 'nav.cards', icon: 'bi-card-heading', route: '/dashboard/cards' },
        { label: 'nav.feedback', icon: 'bi-chat-square-dots', route: '/dashboard/feedback' },
        { label: 'nav.errorPages', icon: 'bi-exclamation-octagon', route: '/dashboard/errors' },
        { label: 'nav.translation', icon: 'bi-translate', route: '/dashboard/i18n' },
      ],
    },
  ],

  hr: [
    { label: 'nav.dashboard', icon: 'bi-house-door', route: '/dashboard/hr' },
    { label: 'nav.profile', icon: 'bi-person-circle', route: '/dashboard/profile' },
    {
      label: 'nav.members',
      icon: 'bi-people',
      items: [
        { label: 'nav.employees', icon: 'bi-person-workspace', route: '/dashboard/employees' },
        { label: 'nav.cvs', icon: 'bi-person-lines-fill', route: '/dashboard/cvs' },
        { label: 'nav.offers', icon: 'bi-briefcase', route: '/dashboard/offers' },
      ],
    },
    {
      label: 'nav.payrollGroup',
      icon: 'bi-cash-stack',
      items: [
        { label: 'nav.payrolls', icon: 'bi-wallet2', route: '/dashboard/payrolls' },
        { label: 'nav.workSchedules', icon: 'bi-calendar-week', route: '/dashboard/work-schedules' },
      ],
    },
  ],

  legal: [
    { label: 'nav.dashboard', icon: 'bi-house-door', route: '/dashboard/legal' },
    { label: 'nav.profile', icon: 'bi-person-circle', route: '/dashboard/profile' },
    {
      label: 'nav.contractsGroup',
      icon: 'bi-file-earmark-text',
      items: [
        {
          label: 'nav.contractRequests',
          icon: 'bi-file-earmark-plus',
          route: '/dashboard/contract-requests',
        },
        { label: 'nav.contracts', icon: 'bi-file-earmark-check', route: '/dashboard/contracts' },
        { label: 'nav.quotations', icon: 'bi-receipt', route: '/dashboard/quotations' },
      ],
    },
  ],

  finance: [
    { label: 'nav.dashboard', icon: 'bi-house-door', route: '/dashboard/finance' },
    { label: 'nav.profile', icon: 'bi-person-circle', route: '/dashboard/profile' },
    {
      label: 'nav.accounting',
      icon: 'bi-calculator',
      items: [
        { label: 'nav.reports', icon: 'bi-bar-chart', route: '/dashboard/reports' },
        { label: 'nav.salesInvoices', icon: 'bi-receipt-cutoff', route: '/dashboard/sales-invoices' },
        { label: 'nav.purchaseInvoices', icon: 'bi-bag', route: '/dashboard/purchase-invoices' },
        { label: 'nav.treasuries', icon: 'bi-safe', route: '/dashboard/treasuries' },
        { label: 'nav.ledger', icon: 'bi-journal-bookmark', route: '/dashboard/ledger' },
      ],
    },
  ],

  operation: [
    { label: 'nav.dashboard', icon: 'bi-house-door', route: '/dashboard/operation' },
    { label: 'nav.profile', icon: 'bi-person-circle', route: '/dashboard/profile' },
    {
      label: 'nav.operations',
      icon: 'bi-gear-wide-connected',
      items: [
        { label: 'nav.workSchedules', icon: 'bi-calendar-week', route: '/dashboard/work-schedules' },
        { label: 'nav.branches', icon: 'bi-diagram-3', route: '/dashboard/branches' },
        { label: 'nav.clients', icon: 'bi-person-check', route: '/dashboard/clients' },
      ],
    },
  ],
};

