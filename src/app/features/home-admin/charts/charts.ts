import { HighchartsChartComponent } from 'highcharts-angular';

import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CHART_COLORS } from '../../../core/constants/chart-colors';

/** shared look so every chart matches the design system */
const AXIS_LABEL = { style: { color: 'var(--muted)', fontSize: '11px' } };

const TITLE_STYLE = {
  color: 'var(--text-color)',
  fontSize: '15px',
  fontWeight: '600',
};

const LEGEND: Highcharts.LegendOptions = {
  itemStyle: { color: 'var(--muted)', fontWeight: '500' },
  itemHoverStyle: { color: 'var(--primary)' },
};

const CHART_BASE: Highcharts.ChartOptions = {
  backgroundColor: 'transparent',
  style: { fontFamily: 'inherit' },
  spacing: [16, 16, 12, 12],
};

@Component({
  selector: 'app-charts',
  imports: [HighchartsChartComponent],
  templateUrl: './charts.html',
})
export class Charts {
  Highcharts: typeof Highcharts = Highcharts;

  // ─────────── revenue trend (area) ───────────
  areaOptions: Highcharts.Options = {
    colors: CHART_COLORS,
    chart: { ...CHART_BASE, type: 'areaspline' },
    title: { text: 'Revenue vs Expenses', align: 'left', style: TITLE_STYLE },
    subtitle: {
      text: 'Last 12 months (SAR)',
      align: 'left',
      style: { color: 'var(--muted)', fontSize: '12px' },
    },
    credits: { enabled: false },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: AXIS_LABEL,
      lineColor: 'var(--border-color)',
      tickColor: 'var(--border-color)',
    },
    yAxis: {
      title: { text: '' },
      labels: AXIS_LABEL,
      gridLineColor: 'var(--border-color)',
      gridLineDashStyle: 'Dash',
    },
    legend: LEGEND,
    tooltip: { shared: true, valuePrefix: 'SAR ' },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.15,
        lineWidth: 2,
        marker: { radius: 3, symbol: 'circle' },
      },
    },
    series: [
      {
        type: 'areaspline',
        name: 'Revenue',
        data: [180, 210, 195, 245, 230, 280, 265, 310, 295, 340, 320, 380],
      },
      {
        type: 'areaspline',
        name: 'Expenses',
        data: [120, 135, 128, 150, 145, 165, 158, 180, 172, 195, 188, 210],
      },
    ],
  };

  // ─────────── task status (donut) ───────────
  chartsOptions: Highcharts.Options = {
    colors: CHART_COLORS,
    chart: { ...CHART_BASE, type: 'pie' },
    title: { text: 'Tasks Overview', align: 'left', style: TITLE_STYLE },
    subtitle: {
      text: '284 tasks this month',
      align: 'left',
      style: { color: 'var(--muted)', fontSize: '12px' },
    },
    credits: { enabled: false },
    tooltip: { pointFormat: '<b>{point.y}</b> ({point.percentage:.1f}%)' },
    legend: { ...LEGEND, align: 'center', verticalAlign: 'bottom', layout: 'horizontal' },
    plotOptions: {
      pie: {
        innerSize: '62%',
        borderWidth: 0,
        showInLegend: true,
        dataLabels: { enabled: false },
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Tasks',
        data: [
          { name: 'Completed', y: 164 },
          { name: 'In progress', y: 92 },
          { name: 'Overdue', y: 28 },
        ],
      },
    ],
  };

  // ─────────── headcount by department (column) ───────────
  barOptions: Highcharts.Options = {
    colors: CHART_COLORS,
    chart: { ...CHART_BASE, type: 'column' },
    title: { text: 'Employees by Department', align: 'left', style: TITLE_STYLE },
    subtitle: {
      text: 'Active headcount',
      align: 'left',
      style: { color: 'var(--muted)', fontSize: '12px' },
    },
    credits: { enabled: false },
    xAxis: {
      categories: ['Security', 'Maintenance', 'Cleaning', 'Admin', 'Sales', 'Accounting'],
      labels: AXIS_LABEL,
      lineColor: 'var(--border-color)',
      tickWidth: 0,
    },
    yAxis: {
      title: { text: '' },
      labels: AXIS_LABEL,
      gridLineColor: 'var(--border-color)',
      gridLineDashStyle: 'Dash',
    },
    legend: LEGEND,
    tooltip: { shared: true },
    plotOptions: {
      column: {
        pointPadding: 0.15,
        groupPadding: 0.12,
        borderWidth: 0,
        borderRadius: 6,
      },
    },
    series: [
      { type: 'column', name: 'Current', data: [210, 96, 78, 54, 48, 46] },
      { type: 'column', name: 'Target', data: [230, 110, 85, 60, 55, 50] },
    ],
  };
}

