import { TestBed } from '@angular/core/testing';

import { MovieCertificationsService } from './movie-certifications.service';

describe('MovieCertificationsService', () => {
  let service: MovieCertificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieCertificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
