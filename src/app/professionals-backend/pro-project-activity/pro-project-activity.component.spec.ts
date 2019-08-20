import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProProjectActivityComponent } from './pro-project-activity.component';

describe('ProProjectActivityComponent', () => {
  let component: ProProjectActivityComponent;
  let fixture: ComponentFixture<ProProjectActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProProjectActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProProjectActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
