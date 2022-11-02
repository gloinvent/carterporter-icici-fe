import { TestBed } from '@angular/core/testing';

import { PassLoaderFlagService } from './pass-loader-flag.service';

describe('PassLoaderFlagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassLoaderFlagService = TestBed.get(PassLoaderFlagService);
    expect(service).toBeTruthy();
  });
});
