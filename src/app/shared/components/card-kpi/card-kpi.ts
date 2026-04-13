import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card-kpi',
  imports: [],
  templateUrl: './card-kpi.html',
  styleUrl: './card-kpi.css',
})
export class CardKpi {
  icon = input<string>();
  title = input<string>();
  count = input<number>(0);
  rate = input<string>();
}
