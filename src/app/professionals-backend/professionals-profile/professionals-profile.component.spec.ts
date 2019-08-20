import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalsProfileComponent } from './professionals-profile.component';

describe('ProfessionalsProfileComponent', () => {
  let component: ProfessionalsProfileComponent;
  let fixture: ComponentFixture<ProfessionalsProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalsProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
