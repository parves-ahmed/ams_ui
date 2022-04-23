import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserPayload} from './user.payload';
import {UserService} from '../shared/user.service';
import {AuthService} from '../auth/shared/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: Array<UserPayload> = [];
  employees: Array<UserPayload> = [];
  userForm: FormGroup;
  user: UserPayload;
  roles = {
    USER: 'User',
    EMPLOYEE: 'Employee'
  };

  constructor(private userService: UserService, private authService: AuthService, private toaster: ToastrService, private modalService: NgbModal,
              private config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.user = {
      id: 0,
      username: '',
      password: '',
      email: '',
      role: '',
      // user id for role wise details
      roleId: 0,
      fullName: '',
      address: '',
      mobile: '',
      // Employee properties below 3
      designation: '',
      picture: null,
      signature: null
    };
  }

  ngOnInit(): void {
    // get all user list from server
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
    // get all employee list from server
    this.userService.getAllEmployees().subscribe(emps => {
      this.employees = emps;
    });
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      // user id for role wise details
      fullName: new FormControl('', Validators.required),
      address: new FormControl(''),
      mobile: new FormControl('', Validators.required),
      // Employee properties below 3
      designation: new FormControl('', Validators.required),
      picture: new FormControl(''),
      signature: new FormControl(''),
    });
  }

  // tslint:disable-next-line:typedef
  create() {
    this.user.fullName = this.userForm.get('fullName').value;
    this.user.username = this.userForm.get('username').value;
    this.user.email = this.userForm.get('email').value;
    this.user.password = this.userForm.get('password').value;
    this.user.role = this.userForm.get('role').value;
    this.user.address = this.userForm.get('address').value;
    this.user.mobile = this.userForm.get('mobile').value;
    this.user.designation = this.userForm.get('designation').value;
    console.log(this.user.role);
    this.userService.create(this.user).subscribe(() => {
      this.toaster.success('User Created Successful');
      window.location.reload();
    }, () => {
      this.toaster.error('Error in User Creation');
    });
  }

  // modal action open
  // tslint:disable-next-line:typedef
  open(content) {
    if (this.authService.getRole() != 'USER') {
      this.modalService.open(content, {centered: true});
    } else {
      this.toaster.error('Only Admins are allowed to create user');
    }
  }

  // modal action close
  // tslint:disable-next-line:typedef
  onClose(modal) {
    modal.close();
  }

}
