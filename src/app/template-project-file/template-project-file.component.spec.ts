import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateProjectFileComponent } from './template-project-file.component';

describe('TemplateProjectFileComponent', () => {
  let component: TemplateProjectFileComponent;
  let fixture: ComponentFixture<TemplateProjectFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateProjectFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateProjectFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
