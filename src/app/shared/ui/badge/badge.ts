import { Component, computed, input } from '@angular/core';

export type BadgeVariant = 'success' | 'danger' | 'warning' | 'info' | 'neutral' | 'primary';

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  primary: 'bg-[var(--primary)]/15 text-[var(--primary)]',
  success: 'bg-[var(--success)]/15 text-[var(--success)]',
  danger: 'bg-[var(--danger)]/15 text-[var(--danger)]',
  warning: 'bg-[var(--warning)]/15 text-[var(--warning)]',
  info: 'bg-[var(--info)]/15 text-[var(--info)]',
  neutral: 'bg-[var(--muted)]/15 text-[var(--muted)]',
};

/**
 * Status pill used in tables, cards and detail pages:
 *
 *   <app-badge [text]="row.status" variant="success" />
 *   <app-badge text="Draft" variant="neutral" [dot]="false" />
 */
@Component({
  selector: 'app-badge',
  template: `
    <span
      class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap"
      [class]="classes()"
    >
      @if (dot()) {
        <span class="size-1.5 rounded-full bg-current"></span>
      }
      @if (icon()) {
        <i [class]="icon()"></i>
      }
      {{ text() }}
      <ng-content />
    </span>
  `,
})
export class Badge {
  text = input<string>('');
  variant = input<BadgeVariant>('neutral');
  /** small colored dot before the text */
  dot = input(true);
  icon = input<string>('');

  classes = computed(() => VARIANT_CLASSES[this.variant()]);
}
