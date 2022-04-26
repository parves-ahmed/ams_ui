import { Component, OnInit } from '@angular/core';
import {AddAllotteePayload} from './add-allottee.payload';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-add-allottee',
  templateUrl: './add-allottee.component.html',
  styleUrls: ['./add-allottee.component.css']
})
export class AddAllotteeComponent implements OnInit {

  addAllottees: Array<AddAllotteePayload> = [];
  addAllotteeForm: FormGroup;
  addAllottee: AddAllotteePayload;
  constructor() { }

  ngOnInit(): void {
    this.addAllotteeForm = new FormGroup({
      username: new FormControl('', Validators.required),
      departmentName: new FormControl('',Validators.required),
      designation: new FormControl('',Validators.required),
      email: new FormControl('', Validators.required),
      phoneNo: new FormControl('',Validators.required),
      userId: new FormControl(''),
      password: new FormControl('', Validators.required)
    });
  }

}
