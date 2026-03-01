import { Component, HostListener, inject, input, output } from '@angular/core';
import { ConfirmDeleteService } from './service/confirm-delete.service';

@Component({
  selector: 'app-dialog-delete',
  imports: [],
  templateUrl: './dialog-delete.html',
  styleUrl: "./dialog-delete.css"
})
export class DialogDelete {
  _modal = inject(ConfirmDeleteService);

  title = input<string>('Confirm Delete');
  message = input<string>();
  confirmDelete = output<void>();

  confirm() {
    this.confirmDelete.emit();
    this._modal.closeModal();
  }
  open() {
    return this._modal.open();
  }

  close() {
    this._modal.closeModal();
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open()) this.close();
  }
}
