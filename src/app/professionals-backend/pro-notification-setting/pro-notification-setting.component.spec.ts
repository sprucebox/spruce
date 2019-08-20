import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProNotificationSettingComponent } from './pro-notification-setting.component';

describe('ProNotificationSettingComponent', () => {
  let component: ProNotificationSettingComponent;
  let fixture: ComponentFixture<ProNotificationSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProNotificationSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProNotificationSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
