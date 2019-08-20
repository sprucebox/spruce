import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditArchiveDetailComponent } from './project-edit-archive-detail.component';

describe('ProjectEditArchiveDetailComponent', () => {
  let component: ProjectEditArchiveDetailComponent;
  let fixture: ComponentFixture<ProjectEditArchiveDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEditArchiveDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditArchiveDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
