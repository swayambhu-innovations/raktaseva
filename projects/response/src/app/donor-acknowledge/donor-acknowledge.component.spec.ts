import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorAcknowledgeComponent } from './donor-acknowledge.component';

describe('DonorAcknowledgeComponent', () => {
  let component: DonorAcknowledgeComponent;
  let fixture: ComponentFixture<DonorAcknowledgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonorAcknowledgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonorAcknowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
