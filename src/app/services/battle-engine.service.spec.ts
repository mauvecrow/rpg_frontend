import { TestBed } from '@angular/core/testing';

import { BattleEngineService } from './battle-engine.service';

describe('BattleEngineService', () => {
  let service: BattleEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
