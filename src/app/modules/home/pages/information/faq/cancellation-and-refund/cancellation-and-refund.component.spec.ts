import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationAndRefundComponent } from './cancellation-and-refund.component';

describe('CancellationAndRefundComponent', () => {
  let component: CancellationAndRefundComponent;
  let fixture: ComponentFixture<CancellationAndRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancellationAndRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationAndRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
