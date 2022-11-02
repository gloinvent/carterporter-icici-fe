import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoTransferMobileComponent } from './cargo-transfer-mobile.component';

describe('CargoTransferMobileComponent', () => {
  let component: CargoTransferMobileComponent;
  let fixture: ComponentFixture<CargoTransferMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoTransferMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoTransferMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
