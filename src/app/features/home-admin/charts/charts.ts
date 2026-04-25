import { HighchartsChartComponent } from 'highcharts-angular';

import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CHART_COLORS } from '../../../core/constants/chart-colors';

@Component({
  selector: 'app-charts',
  imports: [HighchartsChartComponent],
  templateUrl: './charts.html',
  styleUrl: './charts.css',
})
  
    
export class Charts {
  Highcharts: typeof Highcharts = Highcharts;
  chartsOptions: Highcharts.Options = {
    colors: CHART_COLORS,
    chart: {
      type: 'pie',
      backgroundColor: 'var(--card-bg)',
      zooming: {
        type: 'xy',
      },
      panning: {
        enabled: true,
        type: 'xy',
      },
      panKey: 'shift',
    },
    title: {
      text: 'Egg Yolk Composition',
      style: { color: `#fff`, textShadow: '2px 0px 0px var(--primary)',  fontWeight: 'bold' }
    },
    tooltip: {
      valueSuffix: '%',
    },
    subtitle: {
      text: 'sub Title',
      style: {
        color: "#fff",       
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: [
          {
            enabled: true,
            distance: 20,
          },
          {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '1.2em',
              color: '#fff',
              textOutline: 'none',
              opacity: 0.8,
            },
            filter: {
              operator: '>',
              property: 'percentage',
              value: 10,
            },
          },
        ],
      },
    },
    series: [
      {
        name: 'Percentage',
        colorByPoint: true,
        data: [
          {
            name: 'Water',
            y: 55.02,
          },
          {
            name: 'Fat',
            sliced: true,
            selected: true,
            y: 26.71,
          },
          {
            name: 'Carbohydrates',
            y: 1.09,
          },
          {
            name: 'Protein',
            y: 15.5,
          },
          {
            name: 'Ash',
            y: 1.68,
          },
        ],
      },
    ],
  };
}
