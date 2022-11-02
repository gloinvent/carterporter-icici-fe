import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterterminalTransferConfirmationComponent } from './interterminal-transfer-confirmation.component';

describe('InterterminalTransferConfirmationComponent', () => {
  let component: InterterminalTransferConfirmationComponent;
  let fixture: ComponentFixture<InterterminalTransferConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterterminalTransferConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterterminalTransferConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
