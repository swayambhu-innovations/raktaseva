import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallReportComponent } from './overall-report.component';

describe('OverallReportComponent', () => {
  let component: OverallReportComponent;
  let fixture: ComponentFixture<OverallReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverallReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverallReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
