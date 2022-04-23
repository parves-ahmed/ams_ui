import { TestBed } from '@angular/core/testing';

import { StageActorService } from './stage-actor.service';

describe('StageActorService', () => {
  let service: StageActorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StageActorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
