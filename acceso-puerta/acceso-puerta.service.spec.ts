import { TestBed } from '@angular/core/testing';

import { AccesoPuertaService } from './acceso-puerta.service';

describe('AccesoPuertaService', () => {
  let service: AccesoPuertaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccesoPuertaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
