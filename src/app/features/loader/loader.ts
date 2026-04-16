import { Component, inject, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Button } from '../../shared/ui/button/button';
import { LoaderTable } from '../../shared/components/loader/loader-table/loader-table';
import { LoaderCard } from '../../shared/components/loader/loader-card/loader-card';

@Component({
  selector: 'app-loader',
  imports: [Button, LoaderTable, LoaderCard],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  loadingTable = signal<boolean>(false);
  loadingCard = signal<boolean>(false);
  _spinner = inject(NgxSpinnerService);
  // loading page
  loaderPage() {
    this._spinner.show();
    setTimeout(() => {
      this._spinner.hide();
    }, 3000);
  }
  // loading table
  loaderTable() {
    this.loadingTable.set(true);
    setTimeout(() => {
      this.loadingTable.set(false);
    }, 3000);
  }
  // loading card
  loaderCard() {
    this.loadingCard.set(true);
    setTimeout(() => {
      this.loadingCard.set(false);
    }, 3000);
  }
}
