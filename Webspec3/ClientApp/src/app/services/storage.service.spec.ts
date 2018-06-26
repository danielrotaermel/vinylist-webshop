import { TestBed, inject } from '@angular/core/testing';

import { StorageService, LocalStorageService } from './storage.service';

describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
  });

  it('should be created', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service).toBeTruthy();
  }));

  it('should store a given key value pair and load it again', () => {
    let service = new LocalStorageService();
    let key = 'key';
    let value = {
      test: 'value'
    };

    service.setItem(key, value);

    let returned = service.getItem(key);
    expect(returned).toBeDefined();
    expect(returned.test).toBe(value.test);
  });
});
