import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcreatLeadComponent } from './editcreat-lead.component';

describe('EditcreatLeadComponent', () => {
  let component: EditcreatLeadComponent;
  let fixture: ComponentFixture<EditcreatLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcreatLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcreatLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
