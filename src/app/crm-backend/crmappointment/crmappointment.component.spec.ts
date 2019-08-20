import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmappointmentComponent } from './crmappointment.component';

describe('CrmappointmentComponent', () => {
  let component: CrmappointmentComponent;
  let fixture: ComponentFixture<CrmappointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmappointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
