import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoCancellationAndRefundComponent } from './cargo-cancellation-and-refund.component';

describe('CargoCancellationAndRefundComponent', () => {
  let component: CargoCancellationAndRefundComponent;
  let fixture: ComponentFixture<CargoCancellationAndRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoCancellationAndRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoCancellationAndRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
