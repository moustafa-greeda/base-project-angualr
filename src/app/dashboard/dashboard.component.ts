import { AuthService } from './../auth/service/auth';
import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from '../layout/header/header.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from '../core/i18n/language.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, FooterComponent,RouterOutlet],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  isMobile = false;
  sidebarOpen = false;
  sidebarCollapsed = false;
  theme: 'dark' | 'light' = 'dark';
  _serviceAuth = inject(AuthService)

  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  

  /** injected for its constructor side effect: reads the saved language and

      sets <html lang/dir>, which every logical CSS property depends on */

  private _language = inject(LanguageService);

  ngOnInit(): void {
    // Only run in browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Ensure dark theme is applied immediately on load
    this.document.documentElement.setAttribute('data-theme', 'dark');

    this.updateViewport();
    const saved = localStorage.getItem('pf-theme');
    if (saved === 'light' || saved === 'dark') {
      this.theme = saved as 'dark' | 'light';
    } else {
      this.theme = 'dark'; // Default to dark
    }
    this.applyTheme();
    window.addEventListener('resize', () => this.updateViewport());
  }

  updateViewport() {
    this.isMobile = window.innerWidth < 1024;
    if (this.isMobile) {
      this.sidebarOpen = false;
      this.sidebarCollapsed = false;
    } else {
      this.sidebarOpen = true;
    }
  }

  toggleSidebar() {
    if (this.isMobile) this.sidebarOpen = !this.sidebarOpen;
    else this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  closeMobileSidebar() {
    if (this.isMobile) this.sidebarOpen = false;
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('pf-theme', this.theme);

    // fade every surface together for the swap, then drop the class so it
    // never slows down normal hover/focus transitions
    const root = this.document.documentElement;
    root.classList.add('theme-switching');
    this.applyTheme();
    setTimeout(() => root.classList.remove('theme-switching'), 220);
  }

  private applyTheme() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const root = this.document.documentElement;
    root.setAttribute('data-theme', this.theme);
  }
}



