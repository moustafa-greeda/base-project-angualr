import { Component, inject, input, output } from '@angular/core';
import { DialogDelete } from '../../../shared/components/dialog/dialog-delete/dialog-delete';
import { Delete } from '../delete/delete';
import { ConfirmDeleteService } from '../../../shared/components/dialog/dialog-delete/service/confirm-delete.service';

@Component({
  selector: 'app-task',
  imports: [  DialogDelete],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  private _modal = inject(ConfirmDeleteService)

  task = input<any>();
  deleteTask = output();
  openDelete() {
    console.log("=", "open")
    this._modal.openModal()
  }
  onDelete() {
    this.deleteTask.emit(this.task());
  }
}
