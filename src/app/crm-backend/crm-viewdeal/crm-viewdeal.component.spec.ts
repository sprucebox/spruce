import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmViewdealComponent } from './crm-viewdeal.component';

describe('CrmViewdealComponent', () => {
  let component: CrmViewdealComponent;
  let fixture: ComponentFixture<CrmViewdealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmViewdealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmViewdealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
