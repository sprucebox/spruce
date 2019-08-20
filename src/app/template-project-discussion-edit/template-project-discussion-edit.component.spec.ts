import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateProjectDiscussionEditComponent } from './template-project-discussion-edit.component';

describe('TemplateProjectDiscussionEditComponent', () => {
  let component: TemplateProjectDiscussionEditComponent;
  let fixture: ComponentFixture<TemplateProjectDiscussionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateProjectDiscussionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateProjectDiscussionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
