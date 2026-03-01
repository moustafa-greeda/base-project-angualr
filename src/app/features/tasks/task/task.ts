import { Component, computed, inject, input, output } from '@angular/core';
import { DialogDelete } from '../../../shared/components/dialog/dialog-delete/dialog-delete';
import { Delete } from '../delete/delete';
import { ConfirmDeleteService } from '../../../shared/components/dialog/dialog-delete/service/confirm-delete.service';
import { Table } from '../../../shared/components/table/table';

@Component({
  selector: 'app-task',
  imports: [DialogDelete , Table],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  private _modal = inject(ConfirmDeleteService);

  task = input<any>();
  message: any = computed(() => this.task()?.name);
  deleteTask = output();
  openDelete() {    console.log(this.task());
    this._modal.openModal();
  }

  onDelete() {
    this.deleteTask.emit(this.task());
  }

  // column table
  columns = [
    {
      header: 'id',
      field: 'id',
    },
    {
      header: 'name',
      field: 'name',
    },
    {
      header: 'deiscription',
      field: 'deiscription',
    },
  ];
}
