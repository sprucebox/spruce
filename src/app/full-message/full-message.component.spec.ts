import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullMessageComponent } from './full-message.component';

describe('FullMessageComponent', () => {
  let component: FullMessageComponent;
  let fixture: ComponentFixture<FullMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
