import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorDetailComponent } from './donor-detail.component';

describe('DonorDetailComponent', () => {
  let component: DonorDetailComponent;
  let fixture: ComponentFixture<DonorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonorDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
