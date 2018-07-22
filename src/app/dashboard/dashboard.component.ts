import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { User } from '../user';
import { NewUser } from '../new-user';
import { PasswordChange } from '../password-change';
import { UsernameChange } from '../username-change';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user = {};
  users: User[] = [];
  passwordChange: PasswordChange = new PasswordChange();
  usernameChange: UsernameChange = new UsernameChange();
  newUser: NewUser = new NewUser();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(user => this.user = user);
  }

  deleteAuth() {
    this.authService.deleteAuth()
      .pipe(finalize(() => this.router.navigate(['login'])))
      .subscribe();
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  changePassword() {
    this.userService.changePassword(this.passwordChange)
      .subscribe(response => alert(JSON.stringify(response)));
  }

  changeUsername() {
    this.userService.changeUsername(this.usernameChange)
      .subscribe(response => alert(JSON.stringify(response)));
  }

  addUser() {
    this.userService.addUser(this.newUser)
      .subscribe(response => alert(JSON.stringify(response)));
  }
}
