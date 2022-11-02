import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocateUsAirportComponent } from './locate-us-airport.component';

describe('LocateUsAirportComponent', () => {
  let component: LocateUsAirportComponent;
  let fixture: ComponentFixture<LocateUsAirportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocateUsAirportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocateUsAirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
