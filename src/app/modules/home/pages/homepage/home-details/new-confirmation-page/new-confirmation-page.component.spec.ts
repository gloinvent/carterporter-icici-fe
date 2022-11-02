import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConfirmationPageComponent } from './new-confirmation-page.component';

describe('NewConfirmationPageComponent', () => {
  let component: NewConfirmationPageComponent;
  let fixture: ComponentFixture<NewConfirmationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConfirmationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConfirmationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
