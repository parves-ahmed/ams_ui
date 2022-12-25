import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  userId: string;
  constructor(private userService: UserService, private authService: AuthService,
    private router: Router, private toastr: ToastrService, private route: ActivatedRoute) {
    this.addUser = {
      uuid: '',
      username: '',
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.userService.getUser(this.userId).subscribe((user)=>{
        console.log(user['username']);
        this.addUserForm.controls['username'].setValue(user['username']);
        this.addUserForm.controls['email'].setValue(user['email']);
    })
    this.addUserForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  create(){
    this.addUser.username = this.addUserForm.get('username').value;
    this.addUser.email = this.addUserForm.get('email').value;
    this.addUser.password = this.addUserForm.get('password').value;
    console.log("user: " + this.userId);
    this.addUser.uuid = this.userId != '' && this.userId != undefined ? this.userId : '';
    console.log(this.addUser);
    if (this.addUser.username == '') {
      this.toastr.info('username required')
    } else if (this.addUser.email == '') {
      this.toastr.info('email required')
    }
    else if (this.addUser.password == '') {
      this.toastr.info('password required')
    }
    else {
      console.log('uuidtoi' + this.addUser.uuid);
      if(this.userId != '' && this.userId != undefined){
        console.log('uuidedit' + this.addUser.uuid);
        this.userService.update(this.addUser).subscribe(() => {
          this.toastr.success('User Updated Successfully');
          this.router.navigateByUrl('/user')
        }, () => {
          this.toastr.error('Error in User Creation')
        });
      }
      else{
        console.log('uuidcreate' + this.addUser.uuid);
        this.userService.create(this.addUser).subscribe(() => {
          if(this.userService.responseMessage === "user already exists"){
            this.toastr.info(this.userService.responseMessage);
          }else{
            this.toastr.info(this.userService.responseMessage);
            this.router.navigateByUrl('/user')
          }
        }, () => {
          this.toastr.error('Error in User Creation')
        });
      }
    
    }
    
  }

}
