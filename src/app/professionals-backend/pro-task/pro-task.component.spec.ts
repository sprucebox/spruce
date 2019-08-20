import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProTaskComponent } from './pro-task.component';

describe('ProTaskComponent', () => {
  let component: ProTaskComponent;
  let fixture: ComponentFixture<ProTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
