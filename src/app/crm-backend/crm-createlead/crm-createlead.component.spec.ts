import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmCreateleadComponent } from './crm-createlead.component';

describe('CrmCreateleadComponent', () => {
  let component: CrmCreateleadComponent;
  let fixture: ComponentFixture<CrmCreateleadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmCreateleadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmCreateleadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
