import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StagePayload} from '../stage/stage.payload';
import {map} from 'rxjs/operators';
import {StageActorPayload} from '../stageactor/stageActor.payload';

@Injectable({
  providedIn: 'root'
})
export class StageActorService {
  serverUrl = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {
  }

  // get all stage actors list from server
  getAllStageActors(): Observable<Array<StageActorPayload>> {
    return this.httpClient.get<Array<StageActorPayload>>(this.serverUrl + 'api/stageActor');
  }

  create(stageActorModel: StageActorPayload): Observable<boolean> {
    return this.httpClient.post<StageActorPayload>(this.serverUrl + 'api/stageActor/', stageActorModel)
      .pipe(map(data => {
        return true;
      }));
  }
}
