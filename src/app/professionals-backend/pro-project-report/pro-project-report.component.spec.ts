import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProProjectReportComponent } from './pro-project-report.component';

describe('ProProjectReportComponent', () => {
  let component: ProProjectReportComponent;
  let fixture: ComponentFixture<ProProjectReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProProjectReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProProjectReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
