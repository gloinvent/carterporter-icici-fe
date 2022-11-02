import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHomeMobileComponent } from './new-home-mobile.component';

describe('NewHomeMobileComponent', () => {
  let component: NewHomeMobileComponent;
  let fixture: ComponentFixture<NewHomeMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHomeMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHomeMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
