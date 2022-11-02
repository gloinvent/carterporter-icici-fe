import { TestBed } from '@angular/core/testing';

import { PassWeightService } from './pass-weight.service';

describe('PassWeightService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassWeightService = TestBed.get(PassWeightService);
    expect(service).toBeTruthy();
  });
});
