import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownlodeCsvComponent } from './downlode-csv.component';

describe('DownlodeCsvComponent', () => {
  let component: DownlodeCsvComponent;
  let fixture: ComponentFixture<DownlodeCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownlodeCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownlodeCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
