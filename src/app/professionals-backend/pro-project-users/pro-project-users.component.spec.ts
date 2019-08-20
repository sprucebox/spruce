import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProProjectUsersComponent } from './pro-project-users.component';

describe('ProProjectUsersComponent', () => {
  let component: ProProjectUsersComponent;
  let fixture: ComponentFixture<ProProjectUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProProjectUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProProjectUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
