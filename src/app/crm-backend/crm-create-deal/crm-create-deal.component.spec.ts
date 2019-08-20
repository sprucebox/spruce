import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmCreateDealComponent } from './crm-create-deal.component';

describe('CrmCreateDealComponent', () => {
  let component: CrmCreateDealComponent;
  let fixture: ComponentFixture<CrmCreateDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmCreateDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmCreateDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
