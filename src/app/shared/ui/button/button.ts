import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  click = output();
  titleBtn = input<string>('');
  icon = input<string>('bi bi-plus-circle-fill');

  clickEvt() {
    return this.click.emit();
  }
}
