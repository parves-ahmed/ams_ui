import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login').then(() => {
      window.location.reload();
    });
  }

}
