import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderPage } from './shared/components/loader/loader-page/loader-page';
import { ToastHost } from './shared/ui/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule, LoaderPage, ToastHost],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('ERP');
}

