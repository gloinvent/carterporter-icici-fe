import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoTransferComponent } from './cargo-transfer.component';

describe('CargoTransferComponent', () => {
  let component: CargoTransferComponent;
  let fixture: ComponentFixture<CargoTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
