import { Component, signal } from '@angular/core';
import { Button } from '../../shared/ui/button/button';
import { PageHeader } from '../../shared/components/page-header/page-header';

@Component({
  selector: 'app-buttons',
  imports: [Button, PageHeader],
  templateUrl: './buttons.html',
})
export class Buttons {
  isLoading = signal(false);

  save() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2000);
  }
}
