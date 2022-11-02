import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuggageGuideComponent } from './luggage-guide.component';

describe('LuggageGuideComponent', () => {
  let component: LuggageGuideComponent;
  let fixture: ComponentFixture<LuggageGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuggageGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuggageGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
