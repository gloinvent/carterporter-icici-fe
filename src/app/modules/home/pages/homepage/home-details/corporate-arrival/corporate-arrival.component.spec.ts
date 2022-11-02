import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateArrivalComponent } from './corporate-arrival.component';

describe('CorporateArrivalComponent', () => {
  let component: CorporateArrivalComponent;
  let fixture: ComponentFixture<CorporateArrivalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateArrivalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
