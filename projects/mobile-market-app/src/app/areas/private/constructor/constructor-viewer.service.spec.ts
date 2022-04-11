import { TestBed } from '@angular/core/testing';

import { ConstructorViewerService } from './constructor-viewer.service';

describe('ConstructorViewerService', () => {
  let service: ConstructorViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstructorViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
