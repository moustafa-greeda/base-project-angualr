import { Component, computed, inject, signal } from '@angular/core';
import { ClickOutside } from '../../../../shared/directives/click-outside';
import { AppLang, LANGUAGES, LanguageService } from '../../../../core/i18n/language.service';

/** Flag button + dropdown to switch the interface language */
@Component({
  selector: 'app-language-switcher',
  imports: [ClickOutside],
  templateUrl: './language-switcher.html',
  host: { class: 'relative inline-block' },
})
export class LanguageSwitcher {
  private language = inject(LanguageService);

  languages = LANGUAGES;
  current = this.language.current;
  open = signal(false);

  /** the option matching the active language, for the trigger button */
  activeLanguage = computed(
    () => LANGUAGES.find((l) => l.code === this.current()) ?? LANGUAGES[0],
  );

  toggle() {
    this.open.update((v) => !v);
  }

  close() {
    this.open.set(false);
  }

  select(lang: AppLang) {
    this.language.use(lang);
    this.close();
  }
}

