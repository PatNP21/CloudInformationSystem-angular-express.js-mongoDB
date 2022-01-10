import { Note } from './models/Note';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CisService {

  constructor(private http: HttpClient) { }

  saveRegister(data: any) {
    return this.http.post('http://localhost:2501/register_user', data).subscribe(() => {
        console.log(data);
      });
  }

  logToTheService(data: any) {
    // tslint:disable-next-line:ban-types
    return this.http.post('http://localhost:2501/login', data);
  }

  checkLoginStatus() {
    return this.http.get('http://localhost:2501/login_session');
  }

  recoverPassword(data: any) {
    return this.http.post('http://localhost:2501/recoverPassword', data).subscribe(() => {
      console.log(data);
    });
  }

  createANote(data: any) {
    return this.http.post('http://localhost:2501/home/addNote', data).subscribe(() => {
      console.log(data);
    });
  }

  getNotes() {
    return this.http.get<Note[]>('http://localhost:2501/home/getNotes');
  }

  uploadData(data: any) {
    return this.http.post('http://localhost:2501/home/upload', data).subscribe(() => {
      console.log(data);
    });
  }

  getFiles() {
    return this.http.get('http://localhost:2501/home/files');
  }
}
