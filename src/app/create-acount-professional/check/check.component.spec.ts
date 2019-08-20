import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAcountProfessionalCheckComponent } from './check.component';

describe('CheckComponent', () => {
  let component: CreateAcountProfessionalCheckComponent;
  let fixture: ComponentFixture<CreateAcountProfessionalCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAcountProfessionalCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAcountProfessionalCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
