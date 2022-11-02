import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAirportTransferComponent } from './new-airport-transfer.component';

describe('NewAirportTransferComponent', () => {
  let component: NewAirportTransferComponent;
  let fixture: ComponentFixture<NewAirportTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAirportTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAirportTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
