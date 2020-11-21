import { TestBed } from '@angular/core/testing';

import { SendSegnerService } from './send-segner.service';

describe('SendSegnerService', () => {
  let service: SendSegnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendSegnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
