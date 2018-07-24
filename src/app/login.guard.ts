import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StompRService } from '@stomp/ng2-stompjs';
import { Observable, of } from 'rxjs';
import { tap, map, catchError, concat } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private stompService: StompRService,
    private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.getAuth().pipe(
      tap(() => {
        this.stompService.config = {
          url: 'ws://localhost:4200/api/stomp',
          headers: {},
          heartbeat_in: 0,
          heartbeat_out: 20000,
          reconnect_delay: 5000,
          debug: false
        };
        this.stompService.initAndConnect();
      }),
      concat(this.stompService.connectObservable),
      map(user => true),
      catchError(error => {
        this.router.navigate(['login']);
        return of(false);
      }
    ));
  }
}
