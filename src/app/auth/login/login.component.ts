import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginRequest} from './login.payload';
import {AuthService} from '../shared/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Users} from '../userlist'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isError: boolean;
  registerSuccessMessage: string;
  loginForm: FormGroup;
  loginRequest: LoginRequest;
  users= Users;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
              private router: Router, private toaster: ToastrService) {
    this.isError = false;
    this.loginRequest = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    // if (this.authService.isLoggedIn()) {
    //   this.router.navigate(['/home']).then(() => {
    //     window.location.reload();
    //   });
    // }
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    // this.activatedRoute.queryParams
    //   .subscribe(params => {
    //     if (params.registered !== undefined && params.registered === 'true') {
    //       this.toaster.success('Registration Successful');
    //       this.registerSuccessMessage = 'You can login now using your username and password';
    //     }
    //   });
  }

  // tslint:disable-next-line:typedef
  login() {
    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.password = this.loginForm.get('password').value;
    let user = this.users.find(n => n.username = this.loginRequest.username)
    // console.log(this.loginRequest);
    // this.authService.login(this.loginRequest).subscribe(() => {
    //   this.isError = false;
    //   console.log('Login Successful');
    //   this.toaster.success('Login Successful');
    //   this.router.navigateByUrl('/home').then(() => {
    //     window.location.reload();
    //   });
    // }, () => {
    //   this.isError = true;
    //   console.log('Login Failed');
    // });
    if(user.username == this.loginRequest.username.toString()){
      this.isError = false;
      console.log('Login Successful');
      this.toaster.success('Login Successful');
      this.router.navigate(['/home']);
    }
    else {
      this.isError = true;
      console.log('Login Failed');
    }
  }
}

// check branch from dev
 
// this.authService.login(this.loginRequest).subscribe(() => 
