import { TestBed } from '@angular/core/testing';

import { RegistroserviceService } from './registroservice.service';

describe('RegistroserviceService', () => {
  let service: RegistroserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
