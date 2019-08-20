import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateProjectEditTaskComponent } from './template-project-edit-task.component';

describe('TemplateProjectEditTaskComponent', () => {
  let component: TemplateProjectEditTaskComponent;
  let fixture: ComponentFixture<TemplateProjectEditTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateProjectEditTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateProjectEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
