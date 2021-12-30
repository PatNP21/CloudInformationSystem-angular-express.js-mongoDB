import { ActivatedRoute, Router } from '@angular/router';
import { CisService } from './../../cis.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  logged = false;

  constructor(
    private cisS: CisService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  user = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  invalidUsername() {
    return (this.submitted && this.user.controls.username.errors !== null);
  }

  invalidPassword() {
    return (this.submitted && this.user.controls.password.errors !== null);
  }

  ngOnInit(): void {
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
      this.cisS.logToTheService(this.user.value);
      this.router.navigate(['/home']);
    }
  }

}
