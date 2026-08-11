import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.html',
})
export class SearchTable {
  placeholder = input('بحث');
  search = output<string>();

  private timer: ReturnType<typeof setTimeout> | null = null;

  onInput(value: string) {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => this.search.emit(value), 300);
  }
}
