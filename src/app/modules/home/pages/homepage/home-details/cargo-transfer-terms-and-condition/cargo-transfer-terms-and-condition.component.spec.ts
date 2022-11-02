import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoTransferTermsAndConditionComponent } from './cargo-transfer-terms-and-condition.component';

describe('CargoTransferTermsAndConditionComponent', () => {
  let component: CargoTransferTermsAndConditionComponent;
  let fixture: ComponentFixture<CargoTransferTermsAndConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoTransferTermsAndConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoTransferTermsAndConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
