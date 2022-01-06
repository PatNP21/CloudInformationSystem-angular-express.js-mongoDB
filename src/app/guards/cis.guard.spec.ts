import { TestBed } from '@angular/core/testing';

import { CISGuard } from './cis.guard';

describe('CISGuard', () => {
  let guard: CISGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CISGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
