import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountHomeownerComponent } from './create-account-homeowner.component';

describe('CreateAccountHomeownerComponent', () => {
  let component: CreateAccountHomeownerComponent;
  let fixture: ComponentFixture<CreateAccountHomeownerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccountHomeownerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountHomeownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
