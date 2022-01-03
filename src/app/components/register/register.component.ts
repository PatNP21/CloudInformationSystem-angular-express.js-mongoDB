import { Router } from '@angular/router';
import { CisService } from './../../cis.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private cisS: CisService, private builder: FormBuilder, private router: Router) { }

  registered = false;
  submitted = false;

  newUser!: FormGroup;

  change = false;

  ngOnInit(): void {
    this.newUser = this.builder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9]*')]]
    });
  }

  saveRegister(value: any) {
    this.cisS.saveRegister(value);
  }

  invalidFirstName() {
    return (this.submitted && this.newUser.controls.firstName.errors !== null);
  }

  invalidLastName() {
    return (this.submitted && this.newUser.controls.lastName.errors !== null);
  }

  invalidEmail() {
    return (this.submitted && this.newUser.controls.email.errors !== null);
  }

  invalidUsername() {
    return (this.submitted && this.newUser.controls.username.errors !== null);
  }

  invalidPassword() {
    return (this.submitted && this.newUser.controls.password.errors !== null);
  }

  errors(): void {
    console.log(this.newUser.value.errors);
  }

  uncoverPassword(): void {
    if (this.newUser.value.password.type === 'password') {
      this.newUser.value.password.type = 'text';
    } else {
      this.newUser.value.password.type = 'password';
    }
  }

  // tslint:disable-next-line:typedef
  async registerNewUser() {
    this.submitted = true;

    if (this.newUser.invalid) {

      return;

    } else {

      this.registered = true;
      this.cisS.saveRegister(this.newUser.value);
    }
  }

}
