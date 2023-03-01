import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpDetailsContentComponent } from './help-details-content.component';

describe('HelpDetailsContentComponent', () => {
  let component: HelpDetailsContentComponent;
  let fixture: ComponentFixture<HelpDetailsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpDetailsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpDetailsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
