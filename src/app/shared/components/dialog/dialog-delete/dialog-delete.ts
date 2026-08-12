import { Component, inject, input, output } from '@angular/core';
import { ConfirmDeleteService } from './service/confirm-delete.service';
import { DialogShell } from '../dialog-shell/dialog-shell';
import { Button } from '../../../ui/button/button';

/**
 * Confirm-delete dialog: shell behavior comes from app-dialog —
 * this component only owns the message and the confirm action.
 */
@Component({
  selector: 'app-dialog-delete',
  imports: [DialogShell, Button],
  templateUrl: './dialog-delete.html',
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
}
