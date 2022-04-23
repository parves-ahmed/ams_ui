import { TestBed } from '@angular/core/testing';

import { StageactionService } from './stageaction.service';

describe('StageactionService', () => {
  let service: StageactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StageactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
