import { Component, computed, input } from '@angular/core';

/**
 * Skeleton placeholder that mimics the app-table layout:
 * <app-loader-table [rows]="6" [cols]="5" />
 */
@Component({
  selector: 'app-loader-table',
  templateUrl: './loader-table.html',
})
export class LoaderTable {
  rows = input(6);
  cols = input(5);

  rowsArr = computed(() => Array.from({ length: this.rows() }, (_, i) => i));
  colsArr = computed(() => Array.from({ length: this.cols() }, (_, i) => i));

  /** Varied cell widths so the skeleton doesn't look like a rigid grid */
  cellWidth(row: number, col: number): number {
    const widths = [70, 45, 85, 55, 65, 40];
    return widths[(row + col) % widths.length];
  }
}
