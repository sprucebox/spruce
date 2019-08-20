import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProProjectShowDiscussionComponent } from './pro-project-show-discussion.component';

describe('ProProjectShowDiscussionComponent', () => {
  let component: ProProjectShowDiscussionComponent;
  let fixture: ComponentFixture<ProProjectShowDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProProjectShowDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProProjectShowDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
