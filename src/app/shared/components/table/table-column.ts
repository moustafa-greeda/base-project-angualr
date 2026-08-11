import { Directive, inject, input, TemplateRef } from '@angular/core';

export interface TableColumn {
  /** Property name on the row object; also the id used by `appCell` templates */
  key: string;
  label: string;
  sortable?: boolean;
  /** Included in the built-in search. Defaults to true */
  searchable?: boolean;
  width?: string;
  align?: 'start' | 'center' | 'end';
}

export interface PageEvent {
  page: number;
  pageSize: number;
}

export interface SortEvent {
  key: string;
  direction: 'asc' | 'desc';
}

/**
 * Custom cell renderer for a column:
 * <ng-template appCell="status" let-row>...</ng-template>
 */
@Directive({ selector: 'ng-template[appCell]' })
export class CellTemplate {
  appCell = input.required<string>();
  template = inject(TemplateRef);
}
