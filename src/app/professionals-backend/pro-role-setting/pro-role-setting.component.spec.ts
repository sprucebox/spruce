import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProRoleSettingComponent } from './pro-role-setting.component';

describe('ProRoleSettingComponent', () => {
  let component: ProRoleSettingComponent;
  let fixture: ComponentFixture<ProRoleSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProRoleSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProRoleSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
