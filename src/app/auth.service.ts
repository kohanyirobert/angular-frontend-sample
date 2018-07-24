import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { StompRService } from '@stomp/ng2-stompjs';
import { Observable } from 'rxjs';
import { isUndefined } from 'util';

import { User } from './user';
import { LoginDetails } from './login-details';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private stompService: StompRService) { }

  getAuth(loginDetails?: LoginDetails): Observable<User> {
    const httpOptions = {};
    if (!isUndefined(loginDetails)) {
      httpOptions['headers'] = new HttpHeaders({
          'Authorization': 'Basic ' + window.btoa(loginDetails.username + ':' + loginDetails.password)
      });
    }
    return this.http.get<User>('/api/auth', httpOptions);
  }

  deleteAuth(): Observable<void> {
    this.stompService.disconnect();
    return this.http.delete<void>('/api/auth');
  }
}
