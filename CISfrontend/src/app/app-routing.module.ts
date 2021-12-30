import { ReceivedComponent } from './components/home_components/received/received.component';
import { FilesComponent } from './components/home_components/files/files.component';
import { NotesComponent } from './components/home_components/notes/notes.component';
import { HomeComponent } from './components/home/home.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'recoverPassword', component: RecoverPasswordComponent},
  {path: 'home', component: HomeComponent},
  {path: 'home/notes', component: NotesComponent},
  {path: 'home/files', component: FilesComponent},
  {path: 'home/received', component: ReceivedComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
