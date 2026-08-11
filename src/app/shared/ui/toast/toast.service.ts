import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
  title?: string;
}

/**
 * App-wide feedback messages:
 *
 *   private toast = inject(ToastService);
 *   this.toast.success('Saved successfully');
 *   this.toast.error('Could not delete the item');
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = signal<Toast[]>([]);
  toasts = this._toasts.asReadonly();

  private nextId = 1;

  /** default time on screen (ms) */
  private readonly duration = 4000;

  show(type: ToastType, message: string, title?: string) {
    const id = this.nextId++;
    this._toasts.update((list) => [...list, { id, type, message, title }]);
    setTimeout(() => this.dismiss(id), this.duration);
  }

  success(message: string, title?: string) {
    this.show('success', message, title);
  }

  error(message: string, title?: string) {
    this.show('error', message, title);
  }

  info(message: string, title?: string) {
    this.show('info', message, title);
  }

  warning(message: string, title?: string) {
    this.show('warning', message, title);
  }

  dismiss(id: number) {
    this._toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
