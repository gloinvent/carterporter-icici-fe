import { TestBed } from '@angular/core/testing';

import { HomeCitywiseCostService } from './home-citywise-cost.service';

describe('HomeCitywiseCostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeCitywiseCostService = TestBed.get(HomeCitywiseCostService);
    expect(service).toBeTruthy();
  });
});
