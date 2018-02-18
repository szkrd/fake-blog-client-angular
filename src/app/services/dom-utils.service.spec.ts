import { TestBed, inject } from '@angular/core/testing';

import { DomUtilsService } from './dom-utils.service';

describe('DomUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomUtilsService]
    });
  });

  it('should be created', inject([DomUtilsService], (service: DomUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
