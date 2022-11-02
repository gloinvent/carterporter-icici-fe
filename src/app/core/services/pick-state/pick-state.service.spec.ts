import { TestBed } from '@angular/core/testing';

import { PickStateService } from './pick-state.service';

describe('PickStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PickStateService = TestBed.get(PickStateService);
    expect(service).toBeTruthy();
  });
});
