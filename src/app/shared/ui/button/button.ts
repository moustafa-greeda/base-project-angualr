import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  click = output();
  titleBtn = input<string>('');
  varianet = input<'primary' | 'secondary' | 'success' | 'warning' | 'error'>('primary');
  icon = input<string>('bi bi-plus-circle-fill');
  showIcon = input<boolean>(true);
  loading = input<boolean>(false);

  clickEvt() {
    return this.click.emit();
  }
}
