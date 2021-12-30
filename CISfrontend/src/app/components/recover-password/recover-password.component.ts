import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CisService } from './../../cis.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  constructor(private cisS: CisService, private builder: FormBuilder) { }

  emailToRecoverPassword: FormGroup;
  submitted = false;
  confirmedToRecover = false;

  ngOnInit(): void {
    this.emailToRecoverPassword = this.builder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // tslint:disable-next-line:typedef
  invalidEmailToRec() {
    return (this.submitted && this.emailToRecoverPassword.controls.email.errors !== null);
  }

  submit() {
    this.submitted = true;

    if (this.emailToRecoverPassword.invalid) {
      return;
    } else {
      this.confirmedToRecover = true;
      this.cisS.recoverPassword(this.emailToRecoverPassword.value);
    }
  }

  invalidEmail() {

  }

}
