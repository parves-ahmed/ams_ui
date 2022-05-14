import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';
import { UserService } from '../shared/user.service';
import { AddUserPayload } from './add-user.payload';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit { 
  addUserForm: FormGroup;
  addUser: AddUserPayload;
  constructor(private userService: UserService, private authService: AuthService,
    private router: Router, private toastr: ToastrService) {
    this.addUser = {
      id: 0,
      username: '',
      departmentName: '',
      designation: '',
      email: '',
      phoneNo: '',
      userId: 0,
      password: ''
    };
  }

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

  create(){
    this.addUser.username = this.addUserForm.get('username').value;
    this.addUser.departmentName = this.addUserForm.get('departmentName').value;
    this.addUser.designation = this.addUserForm.get('designation').value;
    this.addUser.email = this.addUserForm.get('email').value;
    this.addUser.phoneNo = this.addUserForm.get('phoneNo').value;
    this.addUser.password = this.addUserForm.get('password').value;
    console.log(this.addUser);
    this.userService.create(this.addUser).subscribe(()=>{
      this.toastr.success('User Created Successfully');
      this.router.navigateByUrl('/user').then(()=>{
        window.location.reload();
      })     
    },() => {
      this.toastr.error('Error in User Creation')
    });
  }

}
