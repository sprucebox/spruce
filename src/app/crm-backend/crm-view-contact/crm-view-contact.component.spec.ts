import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmViewContactComponent } from './crm-view-contact.component';

describe('CrmViewContactComponent', () => {
  let component: CrmViewContactComponent;
  let fixture: ComponentFixture<CrmViewContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmViewContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmViewContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
