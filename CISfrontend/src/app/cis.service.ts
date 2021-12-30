import { UserModel } from './models/UserModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class CisService {

  user: UserModel;

  constructor(private http: HttpClient) { }

  /*newUser = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9]*')])
  });*/

  saveRegister(data) {
    return this.http.post('http://localhost:2501/register_user', data).subscribe(() => {
        console.log(data);
      });
  }

  logToTheService(data) {
    return this.http.post('http://localhost:2501/login', data).subscribe(() => {
      console.log(data);
    })
  }

  recoverPassword(data) {
    return this.http.post('http://localhost:2501/recoverPassword', data).subscribe(() => {
      console.log(data);
    })
  }

}
