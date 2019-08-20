import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProColorSettingComponent } from './pro-color-setting.component';

describe('ProColorSettingComponent', () => {
  let component: ProColorSettingComponent;
  let fixture: ComponentFixture<ProColorSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProColorSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProColorSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
