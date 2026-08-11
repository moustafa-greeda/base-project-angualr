import { Component, inject, input, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';
import { AuthService } from '../../auth/service/auth';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs';
import { SIDEBAR_MENU, SidebarEntry, SidebarGroup, SidebarItem, isGroup } from './sidebar.config';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslocoDirective],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  _auth = inject(AuthService);
  _router = inject(Router);

  collapsed = input(false); // desktop collapsed (icon-only)
  mobileOpen = input(false); // sidebar visible (always true on desktop)
  isMobile = input(false); // viewport is below the lg breakpoint
  closeMobile = output();

  menu: SidebarEntry[] = [];
  isGroup = isGroup;

  /** labels of currently-expanded groups */
  private expanded = signal<Set<string>>(new Set());

  /** current url, kept in sync with navigation */
  private currentUrl = toSignal(
    this._router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this._router.url },
  );

  ngOnInit() {
    const user = this._auth.user();
    if (!user) return;
    this.menu = SIDEBAR_MENU[user.userType] || [];

    // auto-expand the group that contains the active route
    const url = this._router.url;
    const active = this.menu
      .filter(isGroup)
      .filter((g) => g.items.some((i) => url.startsWith(i.route)))
      .map((g) => g.label);
    this.expanded.set(new Set(active));
  }

  /** flat list of all items — used in collapsed (icon-only) mode */
  get flatItems(): SidebarItem[] {
    return this.menu.flatMap((e) => (isGroup(e) ? e.items : [e]));
  }

  toggleGroup(label: string) {
    this.expanded.update((set) => {
      const next = new Set(set);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }

  isExpanded(label: string): boolean {
    return this.expanded().has(label);
  }

  /** true when the current page lives inside this group — highlights it while collapsed */
  hasActiveChild(entry: SidebarEntry): boolean {
    if (!isGroup(entry)) return false;
    const url = this.currentUrl();
    return (entry as SidebarGroup).items.some((i) => url.startsWith(i.route));
  }

  logout() {
    this._auth.logout();
  }

  onCloseMobile() {
    this.closeMobile.emit();
  }
}

