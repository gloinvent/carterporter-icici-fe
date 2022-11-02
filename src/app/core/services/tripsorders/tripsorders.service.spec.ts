import { TestBed } from '@angular/core/testing';

import { TripsordersService } from './tripsorders.service';

describe('TripsordersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TripsordersService = TestBed.get(TripsordersService);
    expect(service).toBeTruthy();
  });
});
