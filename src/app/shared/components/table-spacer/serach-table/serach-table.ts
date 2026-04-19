import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-table',
  imports: [FormsModule ],
  templateUrl: './serach-table.html',
  styleUrl: './serach-table.css',
})
export class SerachTable {
  searchInput = '';
}
