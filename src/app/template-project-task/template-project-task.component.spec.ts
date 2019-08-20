import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateProjectTaskComponent } from './template-project-task.component';

describe('TemplateProjectTaskComponent', () => {
  let component: TemplateProjectTaskComponent;
  let fixture: ComponentFixture<TemplateProjectTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateProjectTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateProjectTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
