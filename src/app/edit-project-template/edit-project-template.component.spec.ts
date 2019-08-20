import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectTemplateComponent } from './edit-project-template.component';

describe('EditProjectTemplateComponent', () => {
  let component: EditProjectTemplateComponent;
  let fixture: ComponentFixture<EditProjectTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
