import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProProjectTaskEditComponent } from './pro-project-task-edit.component';

describe('ProProjectTaskEditComponent', () => {
  let component: ProProjectTaskEditComponent;
  let fixture: ComponentFixture<ProProjectTaskEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProProjectTaskEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProProjectTaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
