import { Component, inject, signal } from '@angular/core';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { Button } from '../../shared/ui/button/button';
import { Badge } from '../../shared/ui/badge/badge';
import { LanguageService } from '../../core/i18n/language.service';

@Component({
  selector: 'app-i18n-test',
  imports: [TranslocoPipe, TranslocoDirective, PageHeader, Button, Badge],
  templateUrl: './i18n-test.html',
})
export class I18nTest {
  private transloco = inject(TranslocoService);
  private language = inject(LanguageService);

  current = this.language.current;
  isRtl = this.language.isRtl;

  /** values fed into the parameterised translations */
  name = signal('Ahmed');
  itemCount = signal(3);

  /** translated from TypeScript, not the template */
  fromCode = signal('');

  toggleLang() {
    this.language.toggle();
    this.readFromCode();
  }

  /** shows how to translate outside a template */
  readFromCode() {
    this.fromCode.set(this.transloco.translate('demo.greeting', { name: this.name() }));
  }

  addItem() {
    this.itemCount.update((c) => c + 1);
  }
}
