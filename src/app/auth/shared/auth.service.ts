import {Injectable} from '@angular/core';
import {RegisterRequestPayload} from '../register/registerRequest.payload';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LoginResponse, LoginRequest} from '../login/login.payload';
import {LocalStorageService} from 'ngx-webstorage';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {
    this.serverUrl = 'http://localhost:8080/';
    // this.serverUrl = 'https://wf-demo-wsf.herokuapp.com/';
  }
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  };

  serverUrl: string;
  responseMessage: string;

  register(registerRequestPayload: RegisterRequestPayload): Observable<any> {
    return this.httpClient.post(this.serverUrl + 'api/auth/register', registerRequestPayload).pipe(map(data => {
        console.log('ret: ' + data["message"]);
         this.responseMessage =  data["message"]
         return true;
       }));;
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(this.serverUrl + 'api/auth/login', loginRequest)
      .pipe(map(data => {
        this.localStorage.store('authenticationToken', data.access_token);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refresh_token);
        this.localStorage.store('expiresAt', data.expiresAt);
        this.localStorage.store('role', data.role);
        return true;
      }));
  }

  public roleMatch(allowedRoles): boolean{
    let isMatch = false;
    const userRoles: any  = this.getRole().replace("[","").replace("]", "").split(",");
    if(userRoles != null && userRoles){
      for(let i= 0; userRoles.length; i++){
        for(let j= 0; allowedRoles.length; j++){
          if(userRoles[i] === allowedRoles[j]){
            isMatch = true
            return isMatch;
          }
          else{
            return isMatch;
          }
        }
      }    
    }
  }

  // tslint:disable-next-line:typedef
  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      userName: this.getUserName()
    };
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token',
      refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.store('authenticationToken', response.access_token);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  // tslint:disable-next-line:typedef
  logout() {
    // this.httpClient.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload,
    //   { responseType: 'text' })
    //   .subscribe(data => {
    //     console.log(data);
    //   }, error => {
    //     throwError(error);
    //   });
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
    this.localStorage.clear('role');
  }

  // tslint:disable-next-line:typedef
  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  // tslint:disable-next-line:typedef
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  // tslint:disable-next-line:typedef
  getUserName() {
    return this.localStorage.retrieve('username');
  }

  // tslint:disable-next-line:typedef
  getExpirationTime() {
    return this.localStorage.retrieve('expiresAt');
  }

  // tslint:disable-next-line:typedef
  getRole() {
    return this.localStorage.retrieve('role');
  }

  // tslint:disable-next-line:typedef
  isLoggedIn() {
    return this.getJwtToken() != null;
  }
}
