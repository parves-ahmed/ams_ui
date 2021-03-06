import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserPayload} from '../user/user.payload';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  serverUrl = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {
  }

  // get all user list from server
  getAllUsers(): Observable<Array<UserPayload>> {
    return this.httpClient.get<Array<UserPayload>>(this.serverUrl + 'api/user/user');
  }

  // get all employee list from server
  getAllEmployees(): Observable<Array<UserPayload>> {
    return this.httpClient.get<Array<UserPayload>>(this.serverUrl + 'api/user/emp');
  }

  // get all user/employee by user id from server
  getUser(id): Observable<Array<UserPayload>> {
    return this.httpClient.get<Array<UserPayload>>(this.serverUrl + 'api/user/' + id);
  }

  create(user: UserPayload): Observable<boolean> {
    return this.httpClient.post<UserPayload>(this.serverUrl + 'api/user/', user)
      .pipe(map(data => {
        return true;
      }));
  }
}
