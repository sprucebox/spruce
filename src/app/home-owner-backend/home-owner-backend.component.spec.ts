import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOwnerBackendComponent } from './home-owner-backend.component';

describe('HomeOwnerBackendComponent', () => {
  let component: HomeOwnerBackendComponent;
  let fixture: ComponentFixture<HomeOwnerBackendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeOwnerBackendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeOwnerBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
