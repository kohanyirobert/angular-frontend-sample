import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { LoginDetails } from '../login-details';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginDetails: LoginDetails = new LoginDetails();

  constructor(private authService: AuthService, private router: Router) { }

  getAuth() {
    this.authService.getAuth(this.loginDetails).subscribe(user => {
      this.router.navigate(['dashboard']);
    }, error => alert(error.message));
  }
}
