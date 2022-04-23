import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// import {StagePayload} from '../stage/stage.payload';
import {map} from 'rxjs/operators';
import {ApplicationPayload} from '../application/application.payload';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  serverUrl = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {
  }

  // get all stages list from server
  getAllApplications(): Observable<Array<ApplicationPayload>> {
    return this.httpClient.get<Array<ApplicationPayload>>(this.serverUrl + 'api/application');
  }

  // create(model: ApplicationPayload): Observable<boolean> {
  //   return this.httpClient.post<StagePayload>(this.serverUrl + 'api/application/', model)
  //     .pipe(map(data => {
  //       return true;
  //     }));
  // }
}
