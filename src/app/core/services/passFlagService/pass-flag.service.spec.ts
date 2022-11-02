import { TestBed } from '@angular/core/testing';

import { PassFlagService } from './pass-flag.service';

describe('PassFlagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassFlagService = TestBed.get(PassFlagService);
    expect(service).toBeTruthy();
  });
});
