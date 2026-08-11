import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClickOutside } from '../../../../shared/directives/click-outside';
import { AuthService } from '../../../../auth/service/auth';
import { USER_TYPE_LABEL } from '../../../../auth/model/Iuser';

/** Avatar button + dropdown with profile links and sign out */
@Component({
  selector: 'app-user-menu',
  imports: [RouterLink, ClickOutside],
  templateUrl: './user-menu.html',
  host: { class: 'relative inline-block' },
})
export class UserMenu {
  private auth = inject(AuthService);

  user = this.auth.user;
  open = signal(false);

  links = [
    { label: 'My profile', icon: 'bi bi-person', route: '/dashboard/profile' },
    { label: 'Settings', icon: 'bi bi-gear', route: '/dashboard/profile' },
  ];

  /** readable role name shown under the username */
  roleLabel = computed(() => {
    const type = this.user()?.userType;
    return type ? USER_TYPE_LABEL[type] : '—';
  });

  initials = computed(() => {
    const name = this.user()?.username ?? '';
    return (
      name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase())
        .join('') || 'U'
    );
  });

  toggle() {
    this.open.update((v) => !v);
  }

  close() {
    this.open.set(false);
  }

  logout() {
    this.close();
    this.auth.logout();
  }
}

