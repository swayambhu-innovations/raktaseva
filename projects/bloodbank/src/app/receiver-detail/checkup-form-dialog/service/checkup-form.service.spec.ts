import { TestBed } from '@angular/core/testing';

import { CheckupFormService } from './checkup-form.service';

describe('CheckupFormService', () => {
  let service: CheckupFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckupFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
