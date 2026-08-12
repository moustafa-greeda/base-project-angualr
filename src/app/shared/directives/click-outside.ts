import { Directive, ElementRef, inject, output } from '@angular/core';

/**
 * Emits when a click lands outside the host element:
 *
 *   <div (appClickOutside)="close()"> ... </div>
 */
@Directive({
  selector: '[appClickOutside]',
  host: { '(document:click)': 'onDocumentClick($event)' },
})
export class ClickOutside {
  appClickOutside = output<void>();
  private host = inject(ElementRef<HTMLElement>);

  onDocumentClick(event: MouseEvent) {
    const target = event.target as Node;
    // ignore clicks on detached nodes (e.g. an item removed by the same click)
    if (!target.isConnected) return;
    if (!this.host.nativeElement.contains(target)) this.appClickOutside.emit();
  }
}
