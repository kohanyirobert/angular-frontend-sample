import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(private http: HttpClient) { }

  init(): Observable<void> {
    return this.http.get('/api')
      .pipe(map(user => null), catchError(error => of(null)));
  }
}
