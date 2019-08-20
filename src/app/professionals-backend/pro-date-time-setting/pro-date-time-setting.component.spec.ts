import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProDateTimeSettingComponent } from './pro-date-time-setting.component';

describe('ProDateTimeSettingComponent', () => {
  let component: ProDateTimeSettingComponent;
  let fixture: ComponentFixture<ProDateTimeSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProDateTimeSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProDateTimeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
