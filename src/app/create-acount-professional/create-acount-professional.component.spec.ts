import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAcountProfessionalComponent } from './create-acount-professional.component';

describe('CreateAcountProfessionalComponent', () => {
  let component: CreateAcountProfessionalComponent;
  let fixture: ComponentFixture<CreateAcountProfessionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAcountProfessionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAcountProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
