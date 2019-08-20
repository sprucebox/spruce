import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAcountProfessionalCompletedComponent } from './completed.component';

describe('CompletedComponent', () => {
  let component: CreateAcountProfessionalCompletedComponent;
  let fixture: ComponentFixture<CreateAcountProfessionalCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAcountProfessionalCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAcountProfessionalCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
