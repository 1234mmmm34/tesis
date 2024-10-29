import { TestBed } from '@angular/core/testing';

import { EgresosService } from './egresos.service';

describe('EgresosService', () => {
  let service: EgresosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EgresosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
