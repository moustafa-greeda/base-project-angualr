import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ClickOutside } from '../../../../shared/directives/click-outside';
import { AppNotification, NotificationService, NotificationType } from './notification.service';

const ICONS: Record<NotificationType, string> = {
  success: 'bi bi-check-circle-fill',
  warning: 'bi bi-exclamation-triangle-fill',
  danger: 'bi bi-x-circle-fill',
  info: 'bi bi-info-circle-fill',
};

const TONES: Record<NotificationType, string> = {
  success: 'bg-[var(--success)]/12 text-[var(--success)]',
  warning: 'bg-[var(--warning)]/12 text-[var(--warning)]',
  danger: 'bg-[var(--danger)]/12 text-[var(--danger)]',
  info: 'bg-[var(--info)]/12 text-[var(--info)]',
};

/** Bell button + dropdown list, used in the header */
@Component({
  selector: 'app-notifications-menu',
  imports: [RouterLink, ClickOutside, TranslocoDirective],
  templateUrl: './notifications-menu.html',
  host: { class: 'relative inline-block' },
})
export class NotificationsMenu {
  private service = inject(NotificationService);

  items = this.service.items;
  unreadCount = this.service.unreadCount;
  open = signal(false);

  icon = (t: NotificationType) => ICONS[t];
  tone = (t: NotificationType) => TONES[t];

  toggle() {
    this.open.update((v) => !v);
  }

  close() {
    this.open.set(false);
  }

  onItemClick(n: AppNotification) {
    this.service.markRead(n.id);
    this.close();
  }

  markAllRead() {
    this.service.markAllRead();
  }

  remove(event: Event, id: number) {
    event.stopPropagation();
    this.service.remove(id);
  }
}

