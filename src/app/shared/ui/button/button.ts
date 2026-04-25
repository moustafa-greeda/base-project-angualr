import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  clickAction = output();
  titleBtn = input<string>('');
  varianet = input<'primary' | 'secondary' | 'success' | 'warning' | 'error'>('primary');
  customClass = input<string>('')
  icon = input<string>('bi bi-plus-circle-fill');
  showIcon = input<boolean>(true);
  loading = input<boolean>(false);

  clickEvt() {
    return this.clickAction.emit();
  }
}
