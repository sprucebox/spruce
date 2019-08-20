import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAcountProfessionalLicenseComponent } from './license.component';

describe('LicenseComponent', () => {
  let component: CreateAcountProfessionalLicenseComponent;
  let fixture: ComponentFixture<CreateAcountProfessionalLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAcountProfessionalLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAcountProfessionalLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
