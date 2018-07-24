import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StompRService } from '@stomp/ng2-stompjs';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { NewUser } from '../new-user';
import { PasswordChange } from '../password-change';
import { UsernameChange } from '../username-change';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  user = {};
  users: User[] = [];
  passwordChange: PasswordChange = new PasswordChange();
  usernameChange: UsernameChange = new UsernameChange();
  newUser: NewUser = new NewUser();

  private topicSubscription: Subscription;
  private queueSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private stompService: StompRService,
    private router: Router) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(user => this.user = user);
    this.topicSubscription = this.stompService.subscribe('/topic/lucky-number').subscribe(message => {
      console.log(`Global message: ${message.body}`);
    });
    this.queueSubscription = this.stompService.subscribe('/user/queue/lucky-number').subscribe(message => {
      console.log(`User message: ${message.body}`);
    });
  }

  ngOnDestroy(): void {
    this.topicSubscription.unsubscribe();
    this.queueSubscription.unsubscribe();
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
