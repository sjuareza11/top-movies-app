import { TestBed } from '@angular/core/testing';

import { ValidateAgeUserGuard } from './validate-age-user.guard';

describe('ValidateAgeUserGuard', () => {
  let guard: ValidateAgeUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidateAgeUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
