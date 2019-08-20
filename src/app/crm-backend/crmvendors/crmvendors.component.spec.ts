import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmvendorsComponent } from './crmvendors.component';

describe('CrmvendorsComponent', () => {
  let component: CrmvendorsComponent;
  let fixture: ComponentFixture<CrmvendorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmvendorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmvendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
