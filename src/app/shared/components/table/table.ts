import { Component, ViewEncapsulation } from '@angular/core';
import { SerachTable } from './serach-table/serach-table';

@Component({
  selector: 'app-table',
  imports: [SerachTable],
  templateUrl: './table.html',
  styleUrl: './table.css',
  encapsulation: ViewEncapsulation.None,
})
export class Table {

}
