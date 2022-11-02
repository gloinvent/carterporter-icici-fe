import { TestBed } from '@angular/core/testing';

import { PickAirportService } from './pick-airport.service';

describe('PickAirportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PickAirportService = TestBed.get(PickAirportService);
    expect(service).toBeTruthy();
  });
});
