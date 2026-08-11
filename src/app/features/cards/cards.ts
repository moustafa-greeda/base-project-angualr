import { Component, signal } from '@angular/core';
import { Card } from '../../shared/components/cards/card/card';
import { CardKpi, IKpiCard } from '../../shared/components/cards/card-kpi/card-kpi';
import { CardClient, IClientCard } from '../../shared/components/cards/card-client/card-client';
import { PageHeader } from '../../shared/components/page-header/page-header';

@Component({
  selector: 'app-cards',
  imports: [Card, CardKpi, CardClient, PageHeader],
  templateUrl: './cards.html',
})
export class Cards {
  kpis = signal<IKpiCard[]>([
    {
      title: 'Income',
      value: 3145.6,
      icon: 'bi bi-graph-up',
      growthText: '+8.2% growth',
      growthValue: 8.2,
    },
    {
      title: 'Expenses',
      value: 1556.25,
      icon: 'bi bi-cash-stack',
      growthText: '-3.1% decrease',
      growthValue: -3.1,
    },
    {
      title: 'New Clients',
      value: 128,
      icon: 'bi bi-people',
      growthText: '+12% up',
      growthValue: 12,
    },
    {
      title: 'Refunds',
      value: 214.4,
      icon: 'bi bi-arrow-counterclockwise',
      growthText: '-18% down',
      growthValue: -18,
    },
  ]);

  clients: IClientCard[] = [
    {
      name: 'Moustafa Mohamed',
      company: 'Ghasiq Tech',
      email: 'moustafa@ghasiqtech.com',
      phone: '+20 100 123 4567',
      location: 'Mansoura, Egypt',
      status: 'active' as const,
    },
    {
      name: 'Sara Ahmed',
      company: 'Metito Chemical Solutions',
      email: 'sara.ahmed@metito.com',
      phone: '+966 55 987 6543',
      location: 'Riyadh, KSA',
      status: 'active' as const,
    },
    {
      name: 'Omar Khaled',
      company: 'Delta Contracting',
      email: 'omar.k@delta.com',
      phone: '+20 111 222 3334',
      location: 'Cairo, Egypt',
      status: 'inactive' as const,
    },
    {
      name: 'Moustafa Mohamed',
      company: 'Ghasiq Tech',
      email: 'moustafa@ghasiqtech.com',
      phone: '+20 100 123 4567',
      location: 'Mansoura, Egypt',
      status: 'active' as const,
    },
    {
      name: 'Sara Ahmed',
      company: 'Metito Chemical Solutions',
      email: 'sara.ahmed@metito.com',
      phone: '+966 55 987 6543',
      location: 'Riyadh, KSA',
      status: 'active' as const,
    },
    {
      name: 'Omar Khaled',
      company: 'Delta Contracting',
      email: 'omar.k@delta.com',
      phone: '+20 111 222 3334',
      location: 'Cairo, Egypt',
      status: 'inactive' as const,
    },
    {
      name: 'Moustafa Mohamed',
      company: 'Ghasiq Tech',
      email: 'moustafa@ghasiqtech.com',
      phone: '+20 100 123 4567',
      location: 'Mansoura, Egypt',
      status: 'active' as const,
    },
    {
      name: 'Sara Ahmed',
      company: 'Metito Chemical Solutions',
      email: 'sara.ahmed@metito.com',
      phone: '+966 55 987 6543',
      location: 'Riyadh, KSA',
      status: 'active' as const,
    },
    {
      name: 'Omar Khaled',
      company: 'Delta Contracting',
      email: 'omar.k@delta.com',
      phone: '+20 111 222 3334',
      location: 'Cairo, Egypt',
      status: 'inactive' as const,
    },
  ];

  onClientView(name: string) {
    console.log('view client:', name);
  }

  onClientEdit(name: string) {
    console.log('edit client:', name);
  }

  activities = [
    { icon: 'bi bi-file-earmark-text', text: 'New contract request created', time: '2m ago' },
    { icon: 'bi bi-person-plus', text: 'A new member joined the team', time: '1h ago' },
    { icon: 'bi bi-cash-coin', text: 'Invoice #1042 has been paid', time: '3h ago' },
    { icon: 'bi bi-bell', text: 'Reminder: quarterly review meeting', time: 'Yesterday' },
  ];
}
