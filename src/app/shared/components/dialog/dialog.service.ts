import { Injectable, signal } from '@angular/core';

/**
 * Generic open/close state for any dialog.
 * Need a new dialog? Create a one-line subclass so each dialog
 * gets its own independent instance:
 *
 *   @Injectable({ providedIn: 'root' })
 *   export class MyNewDialogService extends DialogService {}
 */
@Injectable()
export class DialogService {
  private _open = signal(false);

  open = this._open.asReadonly();

  openModal() {
    this._open.set(true);
  }

  closeModal() {
    this._open.set(false);
  }
}
