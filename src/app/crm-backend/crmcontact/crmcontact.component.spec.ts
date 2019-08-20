import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmcontactComponent } from './crmcontact.component';

describe('CrmcontactComponent', () => {
  let component: CrmcontactComponent;
  let fixture: ComponentFixture<CrmcontactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmcontactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
