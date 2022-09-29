import { TestBed } from '@angular/core/testing';

import { TopRatedApiService } from './top-rated-api.service';

describe('TopRatedApiService', () => {
  let service: TopRatedApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopRatedApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
