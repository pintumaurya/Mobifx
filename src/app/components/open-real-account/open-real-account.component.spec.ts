import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenRealAccountComponent } from './open-real-account.component';

describe('OpenRealAccountComponent', () => {
  let component: OpenRealAccountComponent;
  let fixture: ComponentFixture<OpenRealAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenRealAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenRealAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
