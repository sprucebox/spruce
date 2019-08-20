import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectTemplateComponent } from './add-project-template.component';

describe('AddProjectTemplateComponent', () => {
  let component: AddProjectTemplateComponent;
  let fixture: ComponentFixture<AddProjectTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
