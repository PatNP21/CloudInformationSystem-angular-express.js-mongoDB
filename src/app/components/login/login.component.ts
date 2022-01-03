import { CookieService } from 'ngx-cookie-service';
import { CisService } from './../../cis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private cisS: CisService,
              private router: Router,
              private route: ActivatedRoute,
              private cookie: CookieService) { }

  submitted = false;
  logged = false;

  user = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  invalidUsername() {
    return (this.submitted && this.user.controls.username.errors !== null);
  }

  invalidPassword() {
    return (this.submitted && this.user.controls.password.errors !== null);
  }

  errors(): void {
    console.log(this.user.value.errors);
  }

  uncoverPassword(): void {
    if (this.user.value.password.type === 'password') {
      this.user.value.password.type = 'text';
    } else {
      this.user.value.password.type = 'password';
    }
  }

  signIn(): void {
    this.submitted = true;

    if (this.user.invalid) {
      return;
    } else {
      this.logged = true;
      this.cisS.logToTheService(this.user.value).subscribe(res => {
        if (res) {
          const data = res;
          console.log(data);
          this.cookie.set('sessionID', String(res));
          localStorage.setItem('username', this.user.value.username);
          this.router.navigate(['/dashboard']);
        } else {
          console.log('Something went wrong!');
        }
      });

    }
  }

}
