import { TestBed } from '@angular/core/testing';

import { PassArrayService } from './pass-array.service';

describe('PassArrayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassArrayService = TestBed.get(PassArrayService);
    expect(service).toBeTruthy();
  });
});
