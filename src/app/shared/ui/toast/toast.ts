import { Component, inject } from '@angular/core';
import { ToastService, ToastType } from './toast.service';

const ICONS: Record<ToastType, string> = {
  success: 'bi bi-check-circle-fill',
  error: 'bi bi-x-circle-fill',
  info: 'bi bi-info-circle-fill',
  warning: 'bi bi-exclamation-triangle-fill',
};

/** card border + faint tinted background per type */
const SHELL: Record<ToastType, string> = {
  success: 'border-[var(--success)]/35 bg-[var(--card-bg)]',
  error: 'border-[var(--danger)]/35 bg-[var(--card-bg)]',
  info: 'border-[var(--info)]/35 bg-[var(--card-bg)]',
  warning: 'border-[var(--warning)]/35 bg-[var(--card-bg)]',
};

/** solid color used by the edge bar and the progress bar */
const BAR: Record<ToastType, string> = {
  success: 'bg-[var(--success)]',
  error: 'bg-[var(--danger)]',
  info: 'bg-[var(--info)]',
  warning: 'bg-[var(--warning)]',
};

/** tinted circle behind the icon */
const ICON_WRAP: Record<ToastType, string> = {
  success: 'bg-[var(--success)]/15 text-[var(--success)]',
  error: 'bg-[var(--danger)]/15 text-[var(--danger)]',
  info: 'bg-[var(--info)]/15 text-[var(--info)]',
  warning: 'bg-[var(--warning)]/15 text-[var(--warning)]',
};

/** Toast host — rendered once in app.html, driven by ToastService */
@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
})
export class ToastHost {
  private service = inject(ToastService);
  toasts = this.service.toasts;

  icon = (type: ToastType) => ICONS[type];
  shellClass = (type: ToastType) => SHELL[type];
  barClass = (type: ToastType) => BAR[type];
  iconWrapClass = (type: ToastType) => ICON_WRAP[type];

  dismiss(id: number) {
    this.service.dismiss(id);
  }
}
