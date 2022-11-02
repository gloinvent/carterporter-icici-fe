import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDepartureComponent } from './corporate-departure.component';

describe('CorporateDepartureComponent', () => {
  let component: CorporateDepartureComponent;
  let fixture: ComponentFixture<CorporateDepartureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDepartureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDepartureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
