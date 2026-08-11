import { Component, computed, input } from '@angular/core';

const COLS_CLASSES: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-3',
};

/**
 * Form section: optional title + responsive column grid for fields.
 * Mobile is always a single column; `cols` applies from md and up.
 *
 *   <app-form-section title="Address" [cols]="3">
 *     <app-form-field ... />
 *   </app-form-section>
 */
@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.html',
})
export class FormSection {
  title = input<string>('');
  cols = input<1 | 2 | 3>(2);

  gridClass = computed(() => COLS_CLASSES[this.cols()] ?? COLS_CLASSES[2]);
}
