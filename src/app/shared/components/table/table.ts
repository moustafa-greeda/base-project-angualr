import { Component, input, output } from '@angular/core';
import { SerachTable } from '../table-spacer/serach-table/serach-table';

@Component({
  selector: 'app-table',
  imports: [SerachTable],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  columns = input<{ header: string; field: string }[]>([]);

  data = input<any>([]);

  // ── BEFORE: @Output() rowEdited = new EventEmitter<any>();
  // ── AFTER:  output()  — emit via this.rowEdited.emit(value)
  rowEdited = output<any>(); // emits the row id
  deleteRow = output<any>(); // emits the row id
  rowAdded = output<void>(); // emits nothing

  onEdit(id: any): void {
    this.rowEdited.emit(id); // same .emit() API as EventEmitter
  }

  onDelete(id: any): void {
    this.deleteRow.emit(id);
  }

  addRow(): void {
    this.rowAdded.emit();
  }
}
