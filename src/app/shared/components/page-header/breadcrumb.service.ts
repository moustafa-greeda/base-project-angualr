import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from '../../../auth/service/auth';
import { SIDEBAR_MENU, isGroup } from '../../../layout/sidebar/sidebar.config';

export interface Crumb {
  /** translation key, resolved by the template */
  label: string;
  /** last crumb has no link — it is the current page */
  route?: string;
}

/**
 * Builds the page trail from the sidebar menu, so a page never has to
 * declare its own path: "Design System > Table" comes straight from the
 * group that contains the active route.
 */
@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private router = inject(Router);
  private auth = inject(AuthService);

  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  /** [group?, page] — empty when the route is not in the menu */
  trail = computed<Crumb[]>(() => {
    const url = this.currentUrl();
    const menu = SIDEBAR_MENU[this.auth.user()?.userType ?? ''] ?? [];

    for (const entry of menu) {
      if (isGroup(entry)) {
        const child = entry.items.find((i) => url.startsWith(i.route));
        if (child) return [{ label: entry.label }, { label: child.label }];
      } else if (url.startsWith(entry.route)) {
        return [{ label: entry.label }];
      }
    }
    return [];
  });
}
