import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalsProjectsComponent } from './professionals-projects.component';

describe('ProfessionalsProjectsComponent', () => {
  let component: ProfessionalsProjectsComponent;
  let fixture: ComponentFixture<ProfessionalsProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalsProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalsProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
