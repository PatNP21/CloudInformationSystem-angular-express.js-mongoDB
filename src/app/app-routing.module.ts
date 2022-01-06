import { ReceivesComponent } from './components/receives/receives.component';
import { FilesComponent } from './components/files/files.component';
import { NotesComponent } from './components/notes/notes.component';
import { NestesComponent } from './components/nestes/nestes.component';
import { CISGuard } from './guards/cis.guard';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'dashboard',
    component: HomeComponent,
    children: [
      {path: '', component: NestesComponent},
      {path: 'notes', component: NotesComponent},
      {path: 'files', component: FilesComponent},
      {path: 'received', component: ReceivesComponent},
    ]
  },
  {path: 'recoverPassword', component: RecoverPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
