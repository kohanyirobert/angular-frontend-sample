import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.getAuth().pipe(
      map(user => {
        sessionStorage.setItem('user', JSON.stringify(user));
        return true;
      }),
      catchError(error => {
        sessionStorage.clear();
        this.router.navigate(['login']);
        return of(false);
      }
    ));
  }
}
