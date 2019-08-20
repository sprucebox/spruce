import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmCreateContactComponent } from './crm-create-contact.component';

describe('CrmCreateContactComponent', () => {
  let component: CrmCreateContactComponent;
  let fixture: ComponentFixture<CrmCreateContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmCreateContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmCreateContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
