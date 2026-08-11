import { Component, HostListener, input, output } from '@angular/core';
import { ScrollLock } from '../../../directives/scroll-lock';

/**
 * Generic dialog shell: backdrop, centered panel, header with close button,
 * ESC-to-close and page scroll lock. Content is projected free-form.
 *
 *   <app-dialog [open]="open()" title="..." (closed)="close()">
 *     ... body / footer ...
 *   </app-dialog>
 */
@Component({
  selector: 'app-dialog',
  imports: [ScrollLock],
  templateUrl: './dialog-shell.html',
})
export class DialogShell {
  open = input.required<boolean>();
  title = input<string>('');
  /** Tailwind max-width classes controlling the panel size */
  size = input<string>('sm:max-w-md md:max-w-2xl lg:max-w-4xl');

  closed = output<void>();

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open()) this.closed.emit();
  }
}
