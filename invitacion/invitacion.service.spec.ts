import { TestBed } from '@angular/core/testing';

import { InvitacionService } from './invitacion.service';

describe('InvitacionService', () => {
  let service: InvitacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvitacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
