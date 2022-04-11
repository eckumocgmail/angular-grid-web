import { TestBed } from '@angular/core/testing';

import { ConstructorCustomizerService } from './constructor-customizer.service';

describe('ConstructorCustomizerService', () => {
  let service: ConstructorCustomizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstructorCustomizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
