import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalsAddProjectComponent } from './professionals-add-project.component';

describe('ProfessionalsAddProjectComponent', () => {
  let component: ProfessionalsAddProjectComponent;
  let fixture: ComponentFixture<ProfessionalsAddProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalsAddProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalsAddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
