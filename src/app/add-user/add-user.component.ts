import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AddUserPayload } from './add-user.payload';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUsers: Array<AddUserPayload> = [];
  addUserForm: FormGroup;
  addUser: AddUserPayload;
  constructor() { }

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
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
