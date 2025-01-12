import { TestBed } from '@angular/core/testing';

import { PasswordChangeServiceService } from './password-change-service.service';

describe('PasswordChangeServiceService', () => {
  let service: PasswordChangeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordChangeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
