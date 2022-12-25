import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserPayload} from '../user/user.payload';
import { AddUserPayload } from '../add-user/add-user.payload';

@Injectable({
  providedIn: 'root'
})
export class UserService { 
  serverUrl = 'http://localhost:8080/';

  responseMessage: string;

  constructor(private httpClient: HttpClient) {
  }

  // get all user list from server
  getAllUsers(): Observable<Array<AddUserPayload>> {
    return this.httpClient.get<Array<AddUserPayload>>(this.serverUrl + 'api/admin/users');
  }

  // get all employee list from server
  getAllEmployees(): Observable<Array<UserPayload>> {
    return this.httpClient.get<Array<UserPayload>>(this.serverUrl + 'api/user/emp');
  }

  // get all user/employee by user id from server
  getUser(id): Observable<Array<UserPayload>> {
    return this.httpClient.get<Array<UserPayload>>(this.serverUrl + 'api/admin/user/' + id);
  }
  create(user: AddUserPayload): Observable<boolean> {
    return this.httpClient.post<AddUserPayload>(this.serverUrl + 'api/admin/adduser', user)
      .pipe(map(data => {
       console.log('ret: ' + data["message"]);
        this.responseMessage =  data["message"]
        return true;
      }));
  }
  update(user: AddUserPayload): Observable<boolean> {
    return this.httpClient.post<AddUserPayload>(this.serverUrl + 'api/admin/edituser', user)
      .pipe(map(data => {
        return true;
      }));
  }
}
