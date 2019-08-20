import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmBackendComponent } from './crm-backend.component';

describe('CrmBackendComponent', () => {
  let component: CrmBackendComponent;
  let fixture: ComponentFixture<CrmBackendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmBackendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
