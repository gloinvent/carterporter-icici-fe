import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLocateusMobileComponent } from './new-locateus-mobile.component';

describe('NewLocateusMobileComponent', () => {
  let component: NewLocateusMobileComponent;
  let fixture: ComponentFixture<NewLocateusMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLocateusMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLocateusMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
