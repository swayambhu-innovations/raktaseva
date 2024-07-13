import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyThankComponent } from './survey-thank.component';

describe('SurveyThankComponent', () => {
  let component: SurveyThankComponent;
  let fixture: ComponentFixture<SurveyThankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyThankComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyThankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
