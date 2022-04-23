import {Injectable} from '@angular/core';
import {StagePayload} from '../stage/stage.payload';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  serverUrl = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {
  }

  // get all stages list from server
  getAllStages(): Observable<Array<StagePayload>> {
    return this.httpClient.get<Array<StagePayload>>(this.serverUrl + 'api/stage');
  }

  create(stageModel: StagePayload): Observable<boolean> {
    return this.httpClient.post<StagePayload>(this.serverUrl + 'api/stage/', stageModel)
      .pipe(map(data => {
        return true;
      }));
  }
}
