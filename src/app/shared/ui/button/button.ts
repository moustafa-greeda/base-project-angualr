import { Component, computed, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonSize, ButtonVariant } from './model/ibutton.interface';
import { BASE_CLASSES, ICON_ONLY_SIZE_CLASSES, SIZE_CLASSES, VARIANT_CLASSES } from './model/constantBtn';

/**
 * Design-system button:
 *   <app-button titleBtn="Save" variant="primary" icon="bi bi-check2" (clickAction)="save()" />
 *   <app-button icon="bi bi-trash" variant="dangerOutline" [iconOnly]="true" ariaLabel="Delete" />
 *   <app-button titleBtn="View all" variant="ghost" [link]="'/dashboard/cards'" />
 */
@Component({
  selector: 'app-button',
  imports: [NgTemplateOutlet, RouterLink],
  templateUrl: './button.html',
})
export class Button {
  clickAction = output();

  titleBtn = input<string>('');
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  icon = input<string>('');
  showIcon = input<boolean>(true);
  /** square button showing only the icon; set ariaLabel (or titleBtn) for screen readers */
  iconOnly = input<boolean>(false);
  loading = input<boolean>(false);
  disabled = input<boolean>(false);
  fullWidth = input<boolean>(false);
  type = input<'button' | 'submit'>('button');
  /** when set, renders an <a routerLink> instead of a <button> */
  link = input<string | any[] | null>(null);
  ariaLabel = input<string>('');
  customClass = input<string>('');

  classes = computed(() =>
    [
      BASE_CLASSES,
      VARIANT_CLASSES[this.variant()],
      this.iconOnly() ? ICON_ONLY_SIZE_CLASSES[this.size()] : SIZE_CLASSES[this.size()],
      this.fullWidth() ? 'w-full' : '',
      this.customClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  ariaLabelValue = computed(
    () => this.ariaLabel() || (this.iconOnly() ? this.titleBtn() : '') || null,
  );

  clickEvt() {
    if (this.disabled() || this.loading()) return;
    this.clickAction.emit();
  }
}
