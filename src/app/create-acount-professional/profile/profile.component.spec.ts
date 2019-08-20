import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAcountProfessionalProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: CreateAcountProfessionalProfileComponent;
  let fixture: ComponentFixture<CreateAcountProfessionalProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAcountProfessionalProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAcountProfessionalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
