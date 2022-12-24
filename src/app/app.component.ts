import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth/shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ams-ui';
  showHead: boolean = false;
  constructor(private router: Router, private authService: AuthService){
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        const loggedIn = this.authService.isLoggedIn();
        if (!loggedIn) {
          this.showHead = false;
        } else {
          // console.log("NU")
          this.showHead = true;  
        }
      }
    });
  }
}
