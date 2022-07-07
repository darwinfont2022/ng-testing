import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService]
    });
    service = TestBed.inject(ValueService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', () => {
    it('should behave return state is Angular', () => {
      expect(service.getValue()).toBe('Angular');
    });
  });
  describe('Test for setValue', () => {
    it('should behave return React', () => {
      expect(service.getValue()).toBe('Angular');
      service.setValue('React');
      expect(service.getValue()).toBe('React');
    });
  });

  describe('Test for getPromise ', () => {
    it('should behave return \'promise value\'', (doneFn: any) => {
       service.getPromiseValue()
        .then(value => {
          expect(value).toBe('promise value');
          doneFn();
        });
    });
  });

  describe('Test for getObsevableValue', () => {
    it('should behave \'observable value\'', () => {
      service.getObservableValue().subscribe(value => {
        expect(value).toBe('obserbvble value');
      });
    });
  });
});
// beforeEach(() => {
//   TestBed.configureTestingModule({});
//   service = TestBed.inject(ValueService);
// });

// it('should be created', () => {
//   expect(service).toBeTruthy();
// });