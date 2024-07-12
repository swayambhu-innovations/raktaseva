import { TestBed } from '@angular/core/testing';

import { RequirementFormService } from './requirement-form.service';

describe('RequirementFormService', () => {
  let service: RequirementFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequirementFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
