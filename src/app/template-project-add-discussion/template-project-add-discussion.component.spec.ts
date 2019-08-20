import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateProjectAddDiscussionComponent } from './template-project-add-discussion.component';

describe('TemplateProjectAddDiscussionComponent', () => {
  let component: TemplateProjectAddDiscussionComponent;
  let fixture: ComponentFixture<TemplateProjectAddDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateProjectAddDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateProjectAddDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
