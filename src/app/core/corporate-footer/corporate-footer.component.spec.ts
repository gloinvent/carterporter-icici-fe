import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateFooterComponent } from './corporate-footer.component';

describe('CorporateFooterComponent', () => {
  let component: CorporateFooterComponent;
  let fixture: ComponentFixture<CorporateFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
