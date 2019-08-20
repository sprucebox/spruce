import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProProjectDiscussionComponent } from './pro-project-discussion.component';

describe('ProProjectDiscussionComponent', () => {
  let component: ProProjectDiscussionComponent;
  let fixture: ComponentFixture<ProProjectDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProProjectDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProProjectDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
