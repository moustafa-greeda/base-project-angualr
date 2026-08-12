import { computed, DOCUMENT, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';

export type AppLang = 'en' | 'ar';

const STORAGE_KEY = 'erp-lang';

export interface LanguageOption {
  code: AppLang;
  label: string;
  dir: 'ltr' | 'rtl';
  /** flag image (flagcdn) — renders the same on every OS, unlike emoji flags */
  flag: string;
  /** short code shown next to the flag in the header */
  short: string;
}

/** languages offered in the switcher */
export const LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    label: 'English',
    dir: 'ltr',
    flag: './assets/images/flags/flag-us.png',
    short: 'EN',
  },
  {
    code: 'ar',
    label: 'العربية',
    dir: 'rtl',
    flag: './assets/images/flags/flag-sa.png',
    short: 'AR',
  },
];

/**
 * Owns the active language: switches Transloco, persists the choice and
 * keeps <html lang> / <html dir> in sync so RTL styling works.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private transloco = inject(TranslocoService);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  private _current = signal<AppLang>('en');
  current = this._current.asReadonly();

  isRtl = computed(() => this._current() === 'ar');

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;

    const saved = localStorage.getItem(STORAGE_KEY) as AppLang | null;
    this.use(saved === 'ar' || saved === 'en' ? saved : 'en');
  }

  use(lang: AppLang) {
    this._current.set(lang);
    this.transloco.setActiveLang(lang);

    if (!isPlatformBrowser(this.platformId)) return;

    localStorage.setItem(STORAGE_KEY, lang);

    const html = this.document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }

  toggle() {
    this.use(this._current() === 'en' ? 'ar' : 'en');
  }
}
