import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmreportComponent } from './crmreport.component';

describe('CrmreportComponent', () => {
  let component: CrmreportComponent;
  let fixture: ComponentFixture<CrmreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
