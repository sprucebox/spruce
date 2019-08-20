import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProProjectEditComponent } from './pro-project-edit.component';

describe('ProProjectEditComponent', () => {
  let component: ProProjectEditComponent;
  let fixture: ComponentFixture<ProProjectEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProProjectEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProProjectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
