import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsMenu } from './components/notifications/notifications-menu';
import { UserMenu } from './components/user-menu/user-menu';
import { LanguageSwitcher } from './components/language-switcher/language-switcher';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NotificationsMenu, UserMenu, LanguageSwitcher, TranslocoDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() theme: 'dark' | 'light' = 'dark';
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
  onToggleTheme() {
    this.toggleTheme.emit();
  }
}


