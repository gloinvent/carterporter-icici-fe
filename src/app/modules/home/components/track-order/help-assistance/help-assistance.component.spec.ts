import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAssistanceComponent } from './help-assistance.component';

describe('HelpAssistanceComponent', () => {
  let component: HelpAssistanceComponent;
  let fixture: ComponentFixture<HelpAssistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpAssistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
