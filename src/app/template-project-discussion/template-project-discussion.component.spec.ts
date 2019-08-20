import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateProjectDiscussionComponent } from './template-project-discussion.component';

describe('TemplateProjectDiscussionComponent', () => {
  let component: TemplateProjectDiscussionComponent;
  let fixture: ComponentFixture<TemplateProjectDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateProjectDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateProjectDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
