import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { PermissionService } from './permission.service';

/**
 * Renders its host only when the user holds the permission:
 *
 *   <app-button *appCan="'contracts.delete'" titleBtn="Delete" />
 *   <div *appCan="['payrolls.view', 'reports.view']">…</div>   <!-- any of them -->
 *   <div *appCan="perms; mode: 'all'">…</div>                  <!-- all of them -->
 */
@Directive({ selector: '[appCan]' })
export class Can {
  /** a single key, or a list */
  appCan = input.required<string | string[]>();
  /** how a list is evaluated — 'any' (default) or 'all' */
  appCanMode = input<'any' | 'all'>('any');

  private permissions = inject(PermissionService);
  private template = inject(TemplateRef<unknown>);
  private view = inject(ViewContainerRef);

  private rendered = false;

  constructor() {
    effect(() => {
      const required = this.appCan();
      const keys = Array.isArray(required) ? required : [required];

      const allowed =
        this.appCanMode() === 'all'
          ? this.permissions.checkAll(keys)
          : this.permissions.checkAny(keys);

      if (allowed && !this.rendered) {
        this.view.createEmbeddedView(this.template);
        this.rendered = true;
      } else if (!allowed && this.rendered) {
        this.view.clear();
        this.rendered = false;
      }
    });
  }
}
