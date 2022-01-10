import { CisService } from './../../cis.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  constructor(private cisS: CisService) { }

  file: any;
  filesList: any;

  ngOnInit(): void {
    this.filesList = this.cisS.getFiles().subscribe(() => {
      console.log(this.filesList);
    })
  }

  getFiles(event: any) {
    this.file = URL.createObjectURL(event.target.files[0]);
  }

  uploadFiles() {
    if(this.file !== null) {
      this.cisS.uploadData(this.file);
    }
  }

}
