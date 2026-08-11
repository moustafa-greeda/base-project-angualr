import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideTranslocoScope, TranslocoDirective } from '@jsverse/transloco';
import { CardKpi, IKpiCard } from '../../shared/components/cards/card-kpi/card-kpi';
import { Card } from '../../shared/components/cards/card/card';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { Badge, BadgeVariant } from '../../shared/ui/badge/badge';
import { Button } from '../../shared/ui/button/button';
import { Charts } from './charts/charts';

interface IActivity {
  text: string;
  time: string;
  icon: string;
  tone: string;
}

interface ITaskRow {
  task: string;
  owner: string;
  due: string;
  priority: { label: string; variant: BadgeVariant };
  status: { label: string; variant: BadgeVariant };
}

@Component({
  selector: 'app-home-admin',
  imports: [PageHeader, CardKpi, Card, Badge, Button, Charts, RouterLink, TranslocoDirective],
  templateUrl: './home-admin.html',
  // loads public/i18n/dashboard/{lang}.json only when this page opens
  providers: [provideTranslocoScope('dashboard')],
})
export class HomeAdmin {
  /** titles/labels hold translation keys; the template resolves them */
  kpis = signal<IKpiCard[]>([
    {
      title: 'kpi.revenue',
      value: 2450000,
      icon: 'bi bi-graph-up-arrow',
      growthText: '+15% kpi.vsLastMonth',
      growthValue: 15,
    },
    {
      title: 'kpi.employees',
      value: 532,
      icon: 'bi bi-people',
      growthText: '-2% kpi.vsLastMonth',
      growthValue: -2,
    },
    {
      title: 'kpi.projects',
      value: 24,
      icon: 'bi bi-briefcase',
      growthText: '+20% kpi.vsLastMonth',
      growthValue: 20,
    },
    {
      title: 'kpi.openTasks',
      value: 129,
      icon: 'bi bi-list-check',
      growthText: '+12% kpi.vsLastWeek',
      growthValue: 12,
    },
  ]);

  /** small secondary stats under the KPI row */
  miniStats = signal([
    { label: 'stats.attendance', value: '85%', icon: 'bi bi-person-check', tone: 'success' },
    { label: 'stats.pendingInvoices', value: '18', icon: 'bi bi-receipt', tone: 'warning' },
    { label: 'stats.newContracts', value: '7', icon: 'bi bi-file-earmark-plus', tone: 'info' },
    { label: 'stats.overdueTasks', value: '28', icon: 'bi bi-exclamation-triangle', tone: 'danger' },
  ]);

  /** column headers of the upcoming-tasks table (translation keys) */
  upcomingHeaders = [
    'upcoming.task',
    'upcoming.owner',
    'upcoming.due',
    'upcoming.priority',
    'upcoming.status',
  ];

  /** splits "+15% key" into the percentage and its translated suffix */
  growthParts(text: string): { value: string; key: string } {
    const [value, ...rest] = text.split(' ');
    return { value, key: rest.join(' ') };
  }

  activities = signal<IActivity[]>([
    { text: 'New contract approved with Al-Nokhba Co.', time: '10 minutes ago', icon: 'bi bi-file-earmark-check', tone: 'success' },
    { text: '12 guards assigned to King Road project', time: '25 minutes ago', icon: 'bi bi-people', tone: 'info' },
    { text: 'New invoice created for Aramco', time: '1 hour ago', icon: 'bi bi-receipt', tone: 'warning' },
    { text: 'Ahmed Salem joined the team', time: '2 hours ago', icon: 'bi bi-person-plus', tone: 'success' },
    { text: 'Maintenance task closed at Al-Nokhba complex', time: '3 hours ago', icon: 'bi bi-tools', tone: 'primary' },
  ]);

  upcoming = signal<ITaskRow[]>([
    {
      task: 'Periodic maintenance — Al-Nokhba',
      owner: 'Team 3',
      due: '2024/06/05',
      priority: { label: 'High', variant: 'danger' },
      status: { label: 'In progress', variant: 'info' },
    },
    {
      task: 'Update guard contract — Aramco',
      owner: 'Contracts',
      due: '2024/06/07',
      priority: { label: 'High', variant: 'danger' },
      status: { label: 'In review', variant: 'warning' },
    },
    {
      task: 'Supply security equipment — Project Ya',
      owner: 'Procurement',
      due: '2024/06/10',
      priority: { label: 'Medium', variant: 'warning' },
      status: { label: 'Planned', variant: 'neutral' },
    },
    {
      task: 'Onboarding for new employees',
      owner: 'HR',
      due: '2024/06/12',
      priority: { label: 'Low', variant: 'success' },
      status: { label: 'Planned', variant: 'neutral' },
    },
  ]);

  quickActions = [
    { label: 'quickActions.newTask', icon: 'bi bi-plus-circle', link: '/dashboard/table' },
    {
      label: 'quickActions.newContract',
      icon: 'bi bi-file-earmark-plus',
      link: '/dashboard/contract-requests',
    },
    {
      label: 'quickActions.addEmployee',
      icon: 'bi bi-person-plus',
      link: '/dashboard/employees',
    },
    {
      label: 'quickActions.viewReports',
      icon: 'bi bi-bar-chart',
      link: '/dashboard/reports',
    },
  ];

  toneClass(tone: string): string {
    switch (tone) {
      case 'success':
        return 'bg-[var(--success)]/12 text-[var(--success)]';
      case 'warning':
        return 'bg-[var(--warning)]/12 text-[var(--warning)]';
      case 'danger':
        return 'bg-[var(--danger)]/12 text-[var(--danger)]';
      case 'info':
        return 'bg-[var(--info)]/12 text-[var(--info)]';
      default:
        return 'bg-[var(--primary)]/12 text-[var(--primary)]';
    }
  }
}



