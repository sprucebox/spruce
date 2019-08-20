import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectShowArchiveDiscussionComponent } from './project-show-archive-discussion.component';

describe('ProjectShowArchiveDiscussionComponent', () => {
  let component: ProjectShowArchiveDiscussionComponent;
  let fixture: ComponentFixture<ProjectShowArchiveDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectShowArchiveDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectShowArchiveDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
