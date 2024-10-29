import { TestBed } from '@angular/core/testing';

import { RecuperacionService } from './recuperacion.service';

describe('RecuperacionService', () => {
  let service: RecuperacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuperacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
