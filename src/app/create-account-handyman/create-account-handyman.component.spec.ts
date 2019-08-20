import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountHandymanComponent } from './create-account-handyman.component';

describe('CreateAccountHandymanComponent', () => {
  let component: CreateAccountHandymanComponent;
  let fixture: ComponentFixture<CreateAccountHandymanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccountHandymanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountHandymanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
