import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CookieService } from 'ngx-cookie-service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NestesComponent } from './components/nestes/nestes.component';
import { NotesComponent } from './components/notes/notes.component';
import { FilesComponent } from './components/files/files.component';
import { ReceivesComponent } from './components/receives/receives.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RecoverPasswordComponent,
    NewPasswordComponent,
    WelcomeComponent,
    HomeComponent,
    NestesComponent,
    NotesComponent,
    FilesComponent,
    ReceivesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    NgbModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
