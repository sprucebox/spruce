import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDissucionArchiveComponent } from './project-dissucion-archive.component';

describe('ProjectDissucionArchiveComponent', () => {
  let component: ProjectDissucionArchiveComponent;
  let fixture: ComponentFixture<ProjectDissucionArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDissucionArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDissucionArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
