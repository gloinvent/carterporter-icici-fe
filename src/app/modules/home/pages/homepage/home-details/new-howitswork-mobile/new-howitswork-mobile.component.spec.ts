import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHowitsworkMobileComponent } from './new-howitswork-mobile.component';

describe('NewHowitsworkMobileComponent', () => {
  let component: NewHowitsworkMobileComponent;
  let fixture: ComponentFixture<NewHowitsworkMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHowitsworkMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHowitsworkMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
