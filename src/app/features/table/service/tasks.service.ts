import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private _http = inject(HttpClient);
  private baseUrl = environment.base_url;
  private data = signal<any>([]);
  allData = this.data.asReadonly();

  public getTasks(page: number = 1) {
    return this._http.get<any>(`${this.baseUrl}/customers?page=${page}`).pipe(
      tap((res) => this.data.set(res.data.data)),
      catchError((err) => {
        console.error('HTTP Error: ', err);
        return throwError(() => err);
      }),
    );
  }
}
