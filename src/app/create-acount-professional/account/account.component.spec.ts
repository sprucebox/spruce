import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAcountProfessionalAccountComponent } from './account.component';

describe('AccountComponent', () => {
  let component: CreateAcountProfessionalAccountComponent;
  let fixture: ComponentFixture<CreateAcountProfessionalAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAcountProfessionalAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAcountProfessionalAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
