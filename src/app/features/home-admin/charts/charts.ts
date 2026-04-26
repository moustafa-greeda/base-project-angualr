import { HighchartsChartComponent } from 'highcharts-angular';

import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CHART_COLORS } from '../../../core/constants/chart-colors';
import { inherits } from 'node:util';

@Component({
  selector: 'app-charts',
  imports: [HighchartsChartComponent],
  templateUrl: './charts.html',
  styleUrl: './charts.css',
})
export class Charts {
  Highcharts: typeof Highcharts = Highcharts;

  // -------------- pie chart
  chartsOptions: Highcharts.Options = {
    colors: CHART_COLORS,
    chart: {
      type: 'pie',
      backgroundColor: 'var(--card-bg)',
    },
    title: {
      text: 'Pie Chart',
      style: {
        color: 'var(--text-color)',
        textShadow: '2px 0px 0px var(--primary)',
        fontWeight: 'bold',
      },
    },
    tooltip: {
      valueSuffix: '%',
    },
    subtitle: {
      text: 'sub Title',
      style: {
        color: '#fff',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: [
          {
            enabled: true,
            distance: 30,
          },
          {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '1.2em',
              color: '#fff',
              // textOutline: 'none',
              opacity: 0.8,
            },
            // not appear point in precentage < 10%
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

  // ---------------------- line chart -------------------
  lineOptions: Highcharts.Options = {
    colors: CHART_COLORS,

    chart: {
      type: 'line',
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
      text: 'Line Chart',
      style: {
        color: 'var(--text-color)',
        textShadow: '2px 0px 0px var(--primary)',
        fontWeight: 'bold',
      },
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      labels: {
        style: { color: '#fff' },
      },
      lineWidth: 1,
      lineColor: '#ddd',
    },
    yAxis: {
      title: {
        text: 'Values',
        style: { color: 'var(--secondary' },
      },
      labels: { style: { color: `#fff` } },
      // lineWidth: 1,
      tickColor: 'var(--primary)',
      gridLineColor: '#ddd',
    },
    legend: {
      itemStyle: {
        color: 'var(--text-color)',
      },
      itemHoverStyle: {
        color: 'var(--primary)',
      },
    },

    series: [
      {
        type: 'line',
        name: 'Data 1',
        data: [10, 20, 15, 30, 25],
      },
      {
        type: 'line',
        name: 'Data 2',
        data: [5, 15, 10, 20, 18],
      },
    ],
  };

  // ---------------------- bar chart -------------------
  barOptions: Highcharts.Options = {
    colors: CHART_COLORS,
    chart: {
      type: 'column',
      backgroundColor: 'var(--card-bg)',
    },
    title: {
      text: 'bar chart',
      style: {
        color: 'var(--text-color)',
        textShadow: '2px 0px 0px var(--primary)',
        fontWeight: 'bold',
      },
    },
    xAxis: {
      categories: ['USA', 'China', 'Brazil', 'EU', 'Argentina', 'India'],
      labels: {
        style: { color: 'var(--text-color)' },
      },

      // crosshair: true,
      // accessibility: {
      //   description: 'Countries',
      // },
    },
    yAxis: {
      min: 0,
      title: {
        text: '1000 metric tons (MT)',
        style: { color: 'var(--text-color)' },
      },
      labels: {
        style: {
          color: 'var(--text-color)',
        },
      },
      gridLineWidth: 0,
      lineWidth: 0,
      tickWidth: 0,
    },
    tooltip: {
      valueSuffix: ' (1000 MT)',
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        borderRadius: 10,
      },
    },
    legend: {
      itemStyle: {
        color: 'var(--text-color)',
      },
      itemHoverStyle: {
        color: 'var(--primary)',
      },
    },
    series: [
      {
        name: 'Corn',
        data: [387749, 280000, 129000, 64300, 54000, 34300],
      },
      {
        name: 'Wheat',
        data: [45321, 140000, 10000, 140500, 19500, 113500],
      },
    ],
  };
}
