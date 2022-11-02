import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAirportMobileComponent } from './new-airport-mobile.component';

describe('NewAirportMobileComponent', () => {
  let component: NewAirportMobileComponent;
  let fixture: ComponentFixture<NewAirportMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAirportMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAirportMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
