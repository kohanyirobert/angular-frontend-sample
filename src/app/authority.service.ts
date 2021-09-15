import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

   constructor(private http: HttpClient) { }

  getAuthorities(): Observable<string[]> {
    return this.http.get<string[]>('/api/authorities');
  }
}
