import { Component, computed, inject, input, output } from '@angular/core';
import { ConfirmDeleteService } from '../../../shared/components/dialog/dialog-delete/service/confirm-delete.service';
import { DialogDelete } from '../../../shared/components/dialog/dialog-delete/dialog-delete';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [DialogDelete], 
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class Delete {
  task          = input<any>(null);
  confirmDelete = output<void>();

  private _modalDelete = inject(ConfirmDeleteService);
  isOpen = this._modalDelete.open;

  // ✅ message computed من الـ task
  message = computed(() => 
    `Are you sure you want to delete "${this.task()?.name}"?`
  );

  // ✅ اسمه onDelete يتطابق مع الـ HTML
  onDelete() {
    this.confirmDelete.emit();
    this._modalDelete.closeModal();
  }

  cancel() {
    this._modalDelete.closeModal();
  }
}