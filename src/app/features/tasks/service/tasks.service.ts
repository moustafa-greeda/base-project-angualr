import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private _http = inject(HttpClient)
  private baseUrl =environment.base_url

  public getTasks(){
    return  this._http.get<any>(`${this.baseUrl}/inventory`).pipe(
      map( res => res),
      catchError((err)=>{
        console.error("HTTP Error: ", err);
				return throwError(() => err);
      })
    )
  }
}
