import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorReadyDonationComponent } from './donor-ready-donation.component';

describe('DonorReadyDonationComponent', () => {
  let component: DonorReadyDonationComponent;
  let fixture: ComponentFixture<DonorReadyDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonorReadyDonationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonorReadyDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
