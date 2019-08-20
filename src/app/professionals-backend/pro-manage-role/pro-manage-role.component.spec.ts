import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProManageRoleComponent } from './pro-manage-role.component';

describe('ProManageRoleComponent', () => {
  let component: ProManageRoleComponent;
  let fixture: ComponentFixture<ProManageRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProManageRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProManageRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
