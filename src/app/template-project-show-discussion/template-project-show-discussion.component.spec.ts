import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateProjectShowDiscussionComponent } from './template-project-show-discussion.component';

describe('TemplateProjectShowDiscussionComponent', () => {
  let component: TemplateProjectShowDiscussionComponent;
  let fixture: ComponentFixture<TemplateProjectShowDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateProjectShowDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateProjectShowDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
