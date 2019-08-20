import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalsHomeComponent } from './professionals-home.component';

describe('ProfessionalsHomeComponent', () => {
  let component: ProfessionalsHomeComponent;
  let fixture: ComponentFixture<ProfessionalsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
