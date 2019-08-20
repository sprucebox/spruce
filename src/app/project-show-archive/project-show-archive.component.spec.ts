import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectShowArchiveComponent } from './project-show-archive.component';

describe('ProjectShowArchiveComponent', () => {
  let component: ProjectShowArchiveComponent;
  let fixture: ComponentFixture<ProjectShowArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectShowArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectShowArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
