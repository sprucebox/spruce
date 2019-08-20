import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CramdealComponent } from './cramdeal.component';

describe('CramdealComponent', () => {
  let component: CramdealComponent;
  let fixture: ComponentFixture<CramdealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CramdealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CramdealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
