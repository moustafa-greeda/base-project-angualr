import { Component, input, output, signal } from '@angular/core';
import { Button } from '../../ui/button/button';

@Component({
  selector: 'app-page-header',
  imports: [Button],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
})
export class PageHeader {
  showBtn = input(true);
  title = input<string>('');
  clickBtn = output<PointerEvent>();
  titleBtn = input<string>('');
  icon = input<string>('');

  click($event: PointerEvent) {
    this.clickBtn.emit($event);
    console.log($event);
  }
}
