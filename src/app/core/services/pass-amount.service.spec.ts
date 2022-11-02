import { TestBed } from '@angular/core/testing';

import { PassAmountService } from './pass-amount.service';

describe('PassAmountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassAmountService = TestBed.get(PassAmountService);
    expect(service).toBeTruthy();
  });
});
