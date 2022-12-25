import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {UserRequestPayload} from './user-request.payload';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserRequestService {
  serverUrl = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  getAllUserRequests(): Observable<Array<UserRequestPayload>> {
    return this.httpClient.get<Array<UserRequestPayload>>(this.serverUrl + 'api/admin/getAllUserRequests');
  }

  updatedStatus(updatedRequest: UserRequestPayload): Observable<boolean>{
    return this.httpClient.post<UserRequestPayload>(this.serverUrl + 'api/admin/updateUserRequest', updatedRequest)
      .pipe(map(data => {
        return true;
      }));
  }
}
