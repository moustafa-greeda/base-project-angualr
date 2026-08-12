import { Component, input } from '@angular/core';

/**
 * Generic design-system card: consistent surface, border and radius.
 * <app-card title="...">content</app-card>
 * Optional header actions: <div card-actions>...</div>
 */
@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  // block + full height so cards sharing a grid row stretch to match
  host: { class: 'block h-full' },
})
export class Card {
  title = input<string>();
}
