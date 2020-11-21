import { TestBed } from '@angular/core/testing';

import { RegisterSignerService } from './register-signer.service';

describe('RegisterSignerService', () => {
  let service: RegisterSignerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterSignerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
