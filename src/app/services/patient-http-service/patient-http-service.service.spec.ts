import { TestBed } from '@angular/core/testing';

import { PatientHttpServiceService } from './patient-http-service.service';

describe('PatientHttpServiceService', () => {
  let service: PatientHttpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientHttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
