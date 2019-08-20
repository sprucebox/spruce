import { TestBed, inject } from '@angular/core/testing';

import { ProjecteventService } from './projectevent.service';

describe('ProjecteventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjecteventService]
    });
  });

  it('should be created', inject([ProjecteventService], (service: ProjecteventService) => {
    expect(service).toBeTruthy();
  }));
});
