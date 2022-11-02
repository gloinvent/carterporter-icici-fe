import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSaftyFirstMobileComponent } from './new-safty-first-mobile.component';

describe('NewSaftyFirstMobileComponent', () => {
  let component: NewSaftyFirstMobileComponent;
  let fixture: ComponentFixture<NewSaftyFirstMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSaftyFirstMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSaftyFirstMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
