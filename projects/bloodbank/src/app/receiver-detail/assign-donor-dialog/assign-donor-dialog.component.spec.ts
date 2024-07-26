import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDonorDialogComponent } from './assign-donor-dialog.component';

describe('AssignDonorDialogComponent', () => {
  let component: AssignDonorDialogComponent;
  let fixture: ComponentFixture<AssignDonorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignDonorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignDonorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
