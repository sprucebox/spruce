import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEchiveUserShowComponent } from './project-echive-user-show.component';

describe('ProjectEchiveUserShowComponent', () => {
  let component: ProjectEchiveUserShowComponent;
  let fixture: ComponentFixture<ProjectEchiveUserShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEchiveUserShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEchiveUserShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
