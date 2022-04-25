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
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      // role: new FormControl('', Validators.required),
      // // user id for role wise details
      // fullName: new FormControl('', Validators.required),
      // address: new FormControl(''),
      // mobile: new FormControl('', Validators.required),
      // // Employee properties below 3
      // designation: new FormControl('', Validators.required),
      // picture: new FormControl(''),
      // signature: new FormControl(''),
    });
  }

}
