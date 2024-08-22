import { TestBed } from '@angular/core/testing';

import { FeriadoService } from './feriado.service';

describe('FeriadoService', () => {
  let service: FeriadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeriadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
