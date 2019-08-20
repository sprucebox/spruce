import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProCalendarComponent } from './pro-calendar.component';

describe('ProCalendarComponent', () => {
  let component: ProCalendarComponent;
  let fixture: ComponentFixture<ProCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
