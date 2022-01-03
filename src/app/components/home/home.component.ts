import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cookie: CookieService) { }
  c = this.cookie.get('sessionID');
  userName = 'User';

  ngOnInit(): void {
    if (this.c) {
      this.userName = String(localStorage.getItem('username'));
    }

  }



}
