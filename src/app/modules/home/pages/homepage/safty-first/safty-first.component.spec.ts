import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaftyFirstComponent } from './safty-first.component';

describe('SaftyFirstComponent', () => {
  let component: SaftyFirstComponent;
  let fixture: ComponentFixture<SaftyFirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaftyFirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaftyFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
