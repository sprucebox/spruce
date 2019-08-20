import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalsBackendComponent } from './professionals-backend.component';

describe('ProfessionalsBackendComponent', () => {
  let component: ProfessionalsBackendComponent;
  let fixture: ComponentFixture<ProfessionalsBackendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalsBackendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalsBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
