import { Component, signal } from '@angular/core';
import { CardKpi } from '../../shared/components/card-kpi/card-kpi';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { Charts } from './charts/charts';

@Component({
  selector: 'app-home-admin',
  imports: [PageHeader, CardKpi , Charts],
  templateUrl: './home-admin.html',
  styleUrl: './home-admin.css',
})
export class HomeAdmin {
  kpis = signal([
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
      growthText: '+3.1% increase',
      growthValue: -3.1,
    },
    {
      title: 'Savings',
      value: 1589.17,
      icon: 'bi bi-bullseye',
      growthText: '+12% up',
      growthValue: 12,
    },
    {
      title: 'Down',
      value: -1589.17,
      icon: 'bi bi-cash-stack',
      growthText: '-12% down',
      growthValue: -18,
    },
  ]);
}
