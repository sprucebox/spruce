import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmcustmorsComponent } from './crmcustmors.component';

describe('CrmcustmorsComponent', () => {
  let component: CrmcustmorsComponent;
  let fixture: ComponentFixture<CrmcustmorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmcustmorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmcustmorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
