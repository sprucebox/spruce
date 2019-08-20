import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDiscussionEditComponent } from './project-discussion-edit.component';

describe('ProjectDiscussionEditComponent', () => {
  let component: ProjectDiscussionEditComponent;
  let fixture: ComponentFixture<ProjectDiscussionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDiscussionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDiscussionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
