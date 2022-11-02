import { TestBed } from '@angular/core/testing';

import { RazorPayService } from './razor-pay.service';

describe('RazorPayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RazorPayService = TestBed.get(RazorPayService);
    expect(service).toBeTruthy();
  });
});
