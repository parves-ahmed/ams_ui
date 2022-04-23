import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {RegisterRequestPayload} from './registerRequest.payload';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerRequestPayload: RegisterRequestPayload;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.registerRequestPayload = {
      username: '',
      email: '',
      password: ''
    };
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/application']);
    }
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  // tslint:disable-next-line:typedef
  register() {
    this.registerRequestPayload.username = this.registerForm.get('username').value;
    this.registerRequestPayload.email = this.registerForm.get('email').value;
    this.registerRequestPayload.password = this.registerForm.get('password').value;

    this.authService.register(this.registerRequestPayload).subscribe(() => {
      console.log('Registration Successful');
      this.router.navigate(['/login'], {queryParams: {registered: 'true'}});
    }, () => {
      console.log('Registration Failed');
      this.toastr.error('Registration Failed! Please try again');
    });
  }

}
