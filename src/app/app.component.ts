import { Component, OnInit } from '@angular/core';
import { InitService } from './init.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private intiService: InitService) { }

  ngOnInit(): void {
    this.intiService.init().subscribe();
  }
}
