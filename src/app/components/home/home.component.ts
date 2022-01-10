import { CisService } from './../../cis.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cookie: CookieService, private router: Router, private CisS: CisService) { }
  c = this.cookie.get('sessionID');
  userName = 'User';

  ngOnInit(): void {
    this.userName = String(localStorage.getItem('username'));

  }

  logout() {
    this.cookie.deleteAll();
    this.router.navigate(['/login']);
  }



}
