import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.authService.isLoggedIn();
    if (isAuthenticated) {
      const role = next.data["role"] as Array<string>;
      if(role){
        const match = this.authService.roleMatch(role);
        if(match){
          return true;
        }
        else{
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
    }else{
      this.router.navigateByUrl('/login').then(() => {
        window.location.reload();
      });
    }
    return true;
  }
}
