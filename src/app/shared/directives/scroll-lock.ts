import { DestroyRef, Directive, DOCUMENT, inject } from '@angular/core';

/**
 * Locks page scroll while the host element is in the DOM.
 * Put it on an overlay rendered inside @if — mounting locks, unmounting unlocks:
 *
 *   <div class="overlay" appScrollLock>...</div>
 */
@Directive({ selector: '[appScrollLock]' })
export class ScrollLock {
  private document = inject(DOCUMENT);

  constructor() {
    this.document.body.style.overflow = 'hidden';
    inject(DestroyRef).onDestroy(() => (this.document.body.style.overflow = ''));
  }
}
