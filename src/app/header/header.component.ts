import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  username: string;
  role: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
    this.role = this.authService.getRole().replace("[", "").replace("]", "").split(",");
    if(this.role.includes('ROLE_BLOGGER')){
      this.role = "Blogger";
    }
    if(this.role.includes('ROLE_USER')){
      this.role = "User";
    }
    if(this.role.includes('ROLE_SUPER_ADMIN')){
      this.role = "Admin";
    }
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login').then(() => {
      window.location.reload();
    });
  }

}
