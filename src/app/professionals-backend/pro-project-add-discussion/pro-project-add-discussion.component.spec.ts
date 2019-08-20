import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProProjectAddDiscussionComponent } from './pro-project-add-discussion.component';

describe('ProProjectAddDiscussionComponent', () => {
  let component: ProProjectAddDiscussionComponent;
  let fixture: ComponentFixture<ProProjectAddDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProProjectAddDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProProjectAddDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
