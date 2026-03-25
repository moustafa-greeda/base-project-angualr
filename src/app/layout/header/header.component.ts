import { Component, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() theme: 'dark' | 'light' = 'dark';
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();

  countNotifications: number = 0;
  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
  onToggleTheme() {
    this.toggleTheme.emit();
  }
}
