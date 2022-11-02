import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStaticBlockComponent } from './home-static-block.component';

describe('HomeStaticBlockComponent', () => {
  let component: HomeStaticBlockComponent;
  let fixture: ComponentFixture<HomeStaticBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeStaticBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeStaticBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
