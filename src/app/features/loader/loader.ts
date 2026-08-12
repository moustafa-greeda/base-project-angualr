import { Component, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Button } from '../../shared/ui/button/button';
import { LoaderTable } from '../../shared/components/loader/loader-table/loader-table';
import { LoaderCard } from '../../shared/components/loader/loader-card/loader-card';
import { PageHeader } from '../../shared/components/page-header/page-header';

@Component({
  selector: 'app-loader',
  imports: [Button, LoaderTable, LoaderCard, PageHeader],
  templateUrl: './loader.html',
})
export class Loader {
  private _spinner = inject(NgxSpinnerService);

  cards = Array.from({ length: 4 }, (_, i) => i);

  // full-page spinner demo (ngx-spinner)
  loaderPage() {
    this._spinner.show();
    setTimeout(() => {
      this._spinner.hide();
    }, 3000);
  }
}
