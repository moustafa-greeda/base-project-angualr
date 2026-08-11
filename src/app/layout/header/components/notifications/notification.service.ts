import { computed, Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'warning' | 'danger' | 'info';

export interface AppNotification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  /** already-formatted relative time, e.g. "10 minutes ago" */
  time: string;
  read: boolean;
  /** optional route opened when the item is clicked */
  link?: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _items = signal<AppNotification[]>([
    {
      id: 1,
      type: 'success',
      title: 'Contract approved',
      message: 'The contract with Al-Nokhba Co. was approved.',
      time: '10 minutes ago',
      read: false,
      link: '/dashboard/contracts',
    },
    {
      id: 2,
      type: 'info',
      title: 'New CV request',
      message: '3 new CV requests are waiting for review.',
      time: '1 hour ago',
      read: false,
      link: '/dashboard/cv-requests',
    },
    {
      id: 3,
      type: 'warning',
      title: 'Invoice due soon',
      message: 'Invoice #1042 for Aramco is due in 2 days.',
      time: '3 hours ago',
      read: false,
      link: '/dashboard/sales-invoices',
    },
    {
      id: 4,
      type: 'danger',
      title: 'Overdue tasks',
      message: '28 tasks passed their due date.',
      time: 'Yesterday',
      read: true,
      link: '/dashboard/table',
    },
  ]);

  items = this._items.asReadonly();
  unreadCount = computed(() => this._items().filter((n) => !n.read).length);

  markRead(id: number) {
    this._items.update((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  markAllRead() {
    this._items.update((list) => list.map((n) => ({ ...n, read: true })));
  }

  remove(id: number) {
    this._items.update((list) => list.filter((n) => n.id !== id));
  }

  /** call from anywhere to push a new item */
  push(item: Omit<AppNotification, 'id' | 'read'>) {
    const id = Math.max(0, ...this._items().map((n) => n.id)) + 1;
    this._items.update((list) => [{ ...item, id, read: false }, ...list]);
  }
}

