import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

/** Shape of one KPI item — use it to type dashboard KPI lists */
export interface IKpiCard {
  title: string;
  value: number;
  icon: string;
  growthText: string;
  growthValue: number;
}

@Component({
  selector: 'app-card-kpi',
  imports: [DecimalPipe],
  templateUrl: './card-kpi.html',
})
export class CardKpi {
  icon = input<string>();
  title = input<string>();
  count = input<number>(0);
  rate = input<string>();
  /** Positive → green up arrow, negative → red down arrow */
  trend = input<number>(0);
}

