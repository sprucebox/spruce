import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProAddUserComponent } from './pro-add-user.component';

describe('ProAddUserComponent', () => {
  let component: ProAddUserComponent;
  let fixture: ComponentFixture<ProAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProAddUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
