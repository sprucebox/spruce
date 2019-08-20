import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectArchiveTaskEditComponent } from './project-archive-task-edit.component';

describe('ProjectArchiveTaskEditComponent', () => {
  let component: ProjectArchiveTaskEditComponent;
  let fixture: ComponentFixture<ProjectArchiveTaskEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectArchiveTaskEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectArchiveTaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
