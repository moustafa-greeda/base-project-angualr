import { Component, inject, input, output } from '@angular/core';
import { DialogDelete } from '../../../shared/components/dialog/dialog-delete/dialog-delete';
import { FormDailogService } from '../../../shared/components/dialog/dialog-form/service/form-dialog.service';

@Component({
  selector: 'app-delete',
  imports: [DialogDelete],
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class Delete {
  private _modal = inject(FormDailogService)

  task = input<any>();
  deleteTask = output();
  openDelete() {
    this._modal.openModal()
  }
  onDelete() {
    this.deleteTask.emit(this.task());
  }
}
