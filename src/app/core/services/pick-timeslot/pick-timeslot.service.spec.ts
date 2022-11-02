import { TestBed } from '@angular/core/testing';

import { PickTimeslotService } from './pick-timeslot.service';

describe('PickTimeslotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PickTimeslotService = TestBed.get(PickTimeslotService);
    expect(service).toBeTruthy();
  });
});
