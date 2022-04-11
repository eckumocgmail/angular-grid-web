import { TestBed } from '@angular/core/testing';

import { ConstructorElementsService } from './constructor-elements.service';

describe('ConstructorElementsService', () => {
  let service: ConstructorElementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstructorElementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
