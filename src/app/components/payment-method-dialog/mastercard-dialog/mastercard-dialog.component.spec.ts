import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastercardDialogComponent } from './mastercard-dialog.component';

describe('MastercardDialogComponent', () => {
  let component: MastercardDialogComponent;
  let fixture: ComponentFixture<MastercardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MastercardDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MastercardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
