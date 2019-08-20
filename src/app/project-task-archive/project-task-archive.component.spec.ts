import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskArchiveComponent } from './project-task-archive.component';

describe('ProjectTaskArchiveComponent', () => {
  let component: ProjectTaskArchiveComponent;
  let fixture: ComponentFixture<ProjectTaskArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTaskArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTaskArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
