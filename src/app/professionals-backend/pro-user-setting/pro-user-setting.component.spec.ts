import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProUserSettingComponent } from './pro-user-setting.component';

describe('ProUserSettingComponent', () => {
  let component: ProUserSettingComponent;
  let fixture: ComponentFixture<ProUserSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProUserSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProUserSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
