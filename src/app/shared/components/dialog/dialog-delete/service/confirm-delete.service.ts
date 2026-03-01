import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDeleteService {
      // state
  private _open = signal(false);

  // readonly signal
  open = this._open.asReadonly();

  openModal() {
    this._open.set(true);
  }

  closeModal() {
    this._open.set(false);
  }

}
