import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProEditUserComponent } from './pro-edit-user.component';

describe('ProEditUserComponent', () => {
  let component: ProEditUserComponent;
  let fixture: ComponentFixture<ProEditUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProEditUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
