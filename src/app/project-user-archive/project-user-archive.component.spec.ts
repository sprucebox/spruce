import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUserArchiveComponent } from './project-user-archive.component';

describe('ProjectUserArchiveComponent', () => {
  let component: ProjectUserArchiveComponent;
  let fixture: ComponentFixture<ProjectUserArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectUserArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectUserArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
