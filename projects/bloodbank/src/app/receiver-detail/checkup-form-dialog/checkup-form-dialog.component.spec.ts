import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckupFormDialogComponent } from './checkup-form-dialog.component';

describe('CheckupFormDialogComponent', () => {
  let component: CheckupFormDialogComponent;
  let fixture: ComponentFixture<CheckupFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckupFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckupFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
