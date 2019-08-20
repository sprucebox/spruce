import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProProjectCalendarComponent } from './pro-project-calendar.component';

describe('ProProjectCalendarComponent', () => {
  let component: ProProjectCalendarComponent;
  let fixture: ComponentFixture<ProProjectCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProProjectCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProProjectCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
