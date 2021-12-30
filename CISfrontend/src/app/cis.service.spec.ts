import { TestBed } from '@angular/core/testing';

import { CisService } from './cis.service';

describe('CisService', () => {
  let service: CisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
