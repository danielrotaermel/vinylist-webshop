/* tslint:disable:no-unused-variable */
import { inject, TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';


describe('Service: Session', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionService]
    });
  });

  it('should ...', inject([SessionService], (service: SessionService) => {
    expect(service).toBeTruthy();
  }));
});
