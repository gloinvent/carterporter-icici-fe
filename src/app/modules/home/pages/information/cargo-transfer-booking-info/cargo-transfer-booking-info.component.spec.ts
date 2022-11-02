import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoTransferBookingInfoComponent } from './cargo-transfer-booking-info.component';

describe('CargoTransferBookingInfoComponent', () => {
  let component: CargoTransferBookingInfoComponent;
  let fixture: ComponentFixture<CargoTransferBookingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoTransferBookingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoTransferBookingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
