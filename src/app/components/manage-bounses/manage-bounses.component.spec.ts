import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBounsesComponent } from './manage-bounses.component';

describe('ManageBounsesComponent', () => {
  let component: ManageBounsesComponent;
  let fixture: ComponentFixture<ManageBounsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBounsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBounsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
