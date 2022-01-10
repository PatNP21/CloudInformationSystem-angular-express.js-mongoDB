import { CisService } from './../../cis.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  closeResult = '';
  note!: FormGroup;
  notes?: any;

  constructor(private modalService: NgbModal, private cisS: CisService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.notes = this.cisS.getNotes();
    console.log(this.notes);
    this.note = this.formBuilder.group({
      title: '',
      content: ''
    });
  }

  createNote() {
    this.cisS.createANote(this.note.value);
    this.modalService.dismissAll('Save click');
  }

  // tslint:disable-next-line:typedef
  openCreate(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openSort(sorting: any) {
    this.modalService.open(sorting, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openShare(sharing: any) {
    this.modalService.open(sharing, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
