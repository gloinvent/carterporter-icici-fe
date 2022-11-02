import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCitywiseCostComponent } from './home-citywise-cost.component';

describe('HomeCitywiseCostComponent', () => {
  let component: HomeCitywiseCostComponent;
  let fixture: ComponentFixture<HomeCitywiseCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCitywiseCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCitywiseCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
