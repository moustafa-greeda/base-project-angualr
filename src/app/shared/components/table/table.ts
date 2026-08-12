import {
  Component,
  computed,
  contentChildren,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { SearchTable } from './search-table/search-table';
import { TablePagination } from './pagination/table-pagination';
import { CellTemplate, PageEvent, SortEvent, TableColumn } from './table-column';

type Row = Record<string, any>;

@Component({
  selector: 'app-table',
  imports: [SearchTable, TablePagination, NgTemplateOutlet],
  templateUrl: './table.html',
})
export class Table {
  columns = input.required<TableColumn[]>();
  data = input<Row[]>([]);
  loading = input(false);
  searchable = input(true);
  searchPlaceholder = input('بحث');
  emptyMessage = input('لا توجد بيانات للعرض');
  pageSizeOptions = input<number[]>([10, 25, 50]);

  /** Server-side mode: filtering/sorting/slicing is up to the parent, driven by the events below */
  serverSide = input(false);
  /** Total row count — only needed with [serverSide]="true" */
  total = input(0);

  /** show a selection checkbox column (default off) */
  selectable = input(false);

  searchChange = output<string>();
  pageChange = output<PageEvent>();
  sortChange = output<SortEvent>();
  rowClick = output<Row>();
  /** emits the full list of selected rows on every change */
  selectionChange = output<Row[]>();

  protected searchTerm = signal('');
  protected sortKey = signal<string | null>(null);
  protected sortDir = signal<'asc' | 'desc'>('asc');
  protected pageSize = linkedSignal(() => this.pageSizeOptions()[0] ?? 10);
  private page = signal(1);

  private cellTemplates = contentChildren(CellTemplate);
  protected templateMap = computed(
    () => new Map(this.cellTemplates().map((t) => [t.appCell(), t.template])),
  );

  private filtered = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const rows = this.data();
    if (this.serverSide() || !term) return rows;
    const keys = this.columns()
      .filter((c) => c.searchable !== false)
      .map((c) => c.key);
    return rows.filter((row) =>
      keys.some((key) => String(row[key] ?? '').toLowerCase().includes(term)),
    );
  });

  private sorted = computed(() => {
    const key = this.sortKey();
    if (this.serverSide() || !key) return this.filtered();
    const dir = this.sortDir() === 'asc' ? 1 : -1;
    return [...this.filtered()].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
      return String(av).localeCompare(String(bv), undefined, { numeric: true }) * dir;
    });
  });

  protected totalCount = computed(() => (this.serverSide() ? this.total() : this.sorted().length));
  protected totalPages = computed(() => Math.max(1, Math.ceil(this.totalCount() / this.pageSize())));
  protected currentPage = computed(() => Math.min(this.page(), this.totalPages()));

  protected rows = computed(() => {
    if (this.serverSide()) return this.data();
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.sorted().slice(start, start + this.pageSize());
  });

  protected rangeStart = computed(() =>
    this.totalCount() === 0 ? 0 : (this.currentPage() - 1) * this.pageSize() + 1,
  );
  protected rangeEnd = computed(() =>
    Math.min(this.currentPage() * this.pageSize(), this.totalCount()),
  );

  protected onSearch(term: string) {
    this.searchTerm.set(term);
    this.page.set(1);
    this.searchChange.emit(term);
  }

  protected toggleSort(col: TableColumn) {
    if (this.sortKey() === col.key) {
      this.sortDir.update((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      this.sortKey.set(col.key);
      this.sortDir.set('asc');
    }
    this.page.set(1);
    this.sortChange.emit({ key: col.key, direction: this.sortDir() });
  }

  protected goTo(page: number) {
    const target = Math.min(Math.max(1, page), this.totalPages());
    this.page.set(target);
    this.pageChange.emit({ page: target, pageSize: this.pageSize() });
  }

  protected onPageSizeChange(value: number) {
    this.pageSize.set(value);
    this.page.set(1);
    this.pageChange.emit({ page: 1, pageSize: this.pageSize() });
  }

  // ── row selection ──────────────────────────────
  private selected = signal<Set<Row>>(new Set());

  protected isSelected(row: Row): boolean {
    return this.selected().has(row);
  }

  /** all rows of the current page are selected */
  protected allVisibleSelected = computed(
    () => this.rows().length > 0 && this.rows().every((r) => this.selected().has(r)),
  );

  /** some but not all — drives the header checkbox indeterminate state */
  protected someVisibleSelected = computed(
    () => !this.allVisibleSelected() && this.rows().some((r) => this.selected().has(r)),
  );

  protected toggleRow(row: Row) {
    this.selected.update((set) => {
      const next = new Set(set);
      next.has(row) ? next.delete(row) : next.add(row);
      return next;
    });
    this.emitSelection();
  }

  /** header checkbox: selects/deselects all rows of the current page */
  protected toggleAll() {
    const visible = this.rows();
    const all = this.allVisibleSelected();
    this.selected.update((set) => {
      const next = new Set(set);
      visible.forEach((r) => (all ? next.delete(r) : next.add(r)));
      return next;
    });
    this.emitSelection();
  }

  private emitSelection() {
    this.selectionChange.emit([...this.selected()]);
  }

  protected sortIcon(key: string): string {
    if (this.sortKey() !== key) return 'bi-arrow-down-up opacity-40';
    return this.sortDir() === 'asc' ? 'bi-arrow-up' : 'bi-arrow-down';
  }

  protected alignClass(col: TableColumn): string {
    return col.align === 'center' ? 'text-center' : col.align === 'end' ? 'text-end' : 'text-start';
  }

  protected skeletonRows = Array.from({ length: 6 }, (_, i) => i);
}
