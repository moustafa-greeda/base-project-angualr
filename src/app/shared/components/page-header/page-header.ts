import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { Button } from '../../ui/button/button';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-page-header',
  imports: [Button, RouterLink, TranslocoDirective],
  templateUrl: './page-header.html',
})
export class PageHeader {
  showBtn = input(true);
  title = input<string>('');
  clickBtn = output();
  titleBtn = input<string>('');
  icon = input<string>('');
  /** set false on pages that are not in the sidebar menu */
  showBreadcrumb = input(true);

  /** page trail derived from the sidebar menu */
  trail = inject(BreadcrumbService).trail;

  click() {
    this.clickBtn.emit();
  }
}

