import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmViewleadComponent } from './crm-viewlead.component';

describe('CrmViewleadComponent', () => {
  let component: CrmViewleadComponent;
  let fixture: ComponentFixture<CrmViewleadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmViewleadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmViewleadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
