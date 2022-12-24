import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RequestAuthorityPayload} from './request-authority.payload';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  serverUrl = 'http://localhost:8080/';

  requestedAuthorityPayload: RequestAuthorityPayload;
  constructor(private httpClient: HttpClient) {}

  sendRequesrForAuthority(requestStatus: RequestAuthorityPayload): Observable<boolean> {
    return this.httpClient.post<string>(this.serverUrl + 'api/user/requestAuthority', requestStatus)
      .pipe(map(data => {
        return true;
      }));
  }

  getRequestStatus():  Observable<RequestAuthorityPayload>{
    return this.httpClient.get<RequestAuthorityPayload>(this.serverUrl + 'api/user/getRequestStatus');
  }
}
