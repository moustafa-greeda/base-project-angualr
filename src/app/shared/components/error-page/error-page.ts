import { Component, computed, inject, input } from '@angular/core';
import { Location } from '@angular/common';
import { Button } from '../../ui/button/button';

export type ErrorTone = 'primary' | 'danger' | 'warning';

const TEXT: Record<ErrorTone, string> = {
  primary: 'text-[var(--primary)]',
  danger: 'text-[var(--danger)]',
  warning: 'text-[var(--warning)]',
};

const BG: Record<ErrorTone, string> = {
  primary: 'bg-[var(--primary)]',
  danger: 'bg-[var(--danger)]',
  warning: 'bg-[var(--warning)]',
};

const SOFT: Record<ErrorTone, string> = {
  primary: 'bg-[var(--primary)]/12 text-[var(--primary)]',
  danger: 'bg-[var(--danger)]/12 text-[var(--danger)]',
  warning: 'bg-[var(--warning)]/12 text-[var(--warning)]',
};

/**
 * Shared layout for error screens (404, 403, ...):
 *
 *   <app-error-page code="404" title="Page not found" message="..." icon="bi bi-compass" />
 */
@Component({
  selector: 'app-error-page',
  imports: [Button],
  templateUrl: './error-page.html',
})
export class ErrorPage {
  code = input.required<string>();
  title = input.required<string>();
  message = input<string>('');
  icon = input<string>('bi bi-exclamation-triangle');
  tone = input<ErrorTone>('primary');
  homeLink = input<string>('/dashboard');
  homeLabel = input<string>('Back to dashboard');

  private location = inject(Location);

  accentText = computed(() => TEXT[this.tone()]);
  accentBg = computed(() => BG[this.tone()]);
  accentSoft = computed(() => SOFT[this.tone()]);

  goBack() {
    this.location.back();
  }
}
