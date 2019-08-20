import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProProjectFilesComponent } from './pro-project-files.component';

describe('ProProjectFilesComponent', () => {
  let component: ProProjectFilesComponent;
  let fixture: ComponentFixture<ProProjectFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProProjectFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProProjectFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
