import { Component, input } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  columns = input<{header : string , field: string}[]>([])
  ngOnInit(){
    console.log(this.columns())
  }
  data = input<any>([])
}
