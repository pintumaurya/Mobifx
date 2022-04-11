import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDemoAccountComponent } from './open-demo-account.component';

describe('OpenDemoAccountComponent', () => {
  let component: OpenDemoAccountComponent;
  let fixture: ComponentFixture<OpenDemoAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenDemoAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDemoAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
