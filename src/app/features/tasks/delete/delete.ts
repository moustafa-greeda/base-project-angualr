import { Component, computed, inject, input, output } from '@angular/core';
import { ConfirmDeleteService } from '../../../shared/components/dialog/dialog-delete/service/confirm-delete.service';
import { DialogDelete } from '../../../shared/components/dialog/dialog-delete/dialog-delete';

@Component({
  selector: 'app-delete',
  imports: [DialogDelete],
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class Delete {
  private _modal = inject(ConfirmDeleteService)
  task = input<any>();
  message :any = computed(() => this.task()?.name)
  deleteTask = output();
  ngOnInit(){
    console.log("task deleted is =========>" , this.task())
  }
  onDelete() {
    this.deleteTask.emit(this.task());
  }

    openDelete() {
    this._modal.openModal()
  }
}
