import { Component, input, output } from '@angular/core';
import { Button } from '../button/button';

/**
 * Export / Import pair for table toolbars:
 *
 *   <div table-toolbar>
 *     <app-export-import (exportClick)="exportCsv()" (importFile)="importCsv($event)" />
 *   </div>
 *
 * Export just emits — the screen decides the format (CSV, Excel...).
 * Import opens a native file picker and emits the chosen File.
 */
@Component({
  selector: 'app-export-import',
  imports: [Button],
  templateUrl: './export-import.html',
})
export class ExportImport {
  exportLabel = input('Export');
  importLabel = input('Import');
  /** accepted file types for the picker */
  accept = input('.csv');

  exportClick = output<void>();
  importFile = output<File>();

  onFile(event: Event) {
    const inputEl = event.target as HTMLInputElement;
    const file = inputEl.files?.[0];
    if (file) this.importFile.emit(file);
    inputEl.value = ''; // allow re-importing the same file
  }
}
