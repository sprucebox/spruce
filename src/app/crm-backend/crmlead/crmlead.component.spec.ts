import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmleadComponent } from './crmlead.component';

describe('CrmleadComponent', () => {
  let component: CrmleadComponent;
  let fixture: ComponentFixture<CrmleadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmleadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmleadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
