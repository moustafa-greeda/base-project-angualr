import { Component, ViewEncapsulation } from '@angular/core';
import { SerachTable } from "./serach-table/serach-table";

@Component({
  selector: 'app-table-spacer',
  imports: [SerachTable],
  templateUrl: './table-spacer.html',
  styleUrl: './table-spacer.css',
  encapsulation: ViewEncapsulation.None // دي بتلغي الـ Scoping بتاع الـ CSS
})
export class TableSpacer {
}
