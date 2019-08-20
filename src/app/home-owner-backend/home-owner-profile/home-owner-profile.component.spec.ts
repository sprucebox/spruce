import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOwnerProfileComponent } from './home-owner-profile.component';

describe('HomeOwnerProfileComponent', () => {
  let component: HomeOwnerProfileComponent;
  let fixture: ComponentFixture<HomeOwnerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeOwnerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeOwnerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
