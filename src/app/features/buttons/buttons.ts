import { Component, signal } from '@angular/core';
import { Button } from '../../shared/ui/button/button';

@Component({
  selector: 'app-buttons',
  imports: [Button],
  templateUrl: './buttons.html',
  styleUrl: './buttons.css',
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
