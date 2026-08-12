import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.html',
})
export class TablePagination {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  totalCount = input.required<number>();
  rangeStart = input.required<number>();
  rangeEnd = input.required<number>();
  pageSize = input.required<number>();
  pageSizeOptions = input<number[]>([10, 25, 50]);

  pageChange = output<number>();
  pageSizeChange = output<number>();

  /**
   * Page buttons with ellipsis for large page counts:
   * 1 … 4 5 6 … 20 (first page, window around current, last page)
   */
  protected pageItems = computed<(number | '…')[]>(() => {
    const total = this.totalPages();
    const current = this.currentPage();

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    const items: (number | '…')[] = [1];
    if (start > 2) items.push('…');
    for (let p = start; p <= end; p++) items.push(p);
    if (end < total - 1) items.push('…');
    items.push(total);
    return items;
  });

  protected goTo(page: number) {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) return;
    this.pageChange.emit(page);
  }
}
