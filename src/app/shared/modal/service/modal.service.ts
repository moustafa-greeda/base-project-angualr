import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
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

  toggle() {
    this._open.update(v => !v);
  }
}
