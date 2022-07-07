import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('valueService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [MasterService,
      {
        provide: ValueService, useValue: spy
      }
      ]
    });
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>; 
  });

  it('should behave created', () => {
    expect(masterService).toBeTruthy();
  });

  it('should be call to getValue from valueService', () => {
    // const valueService = jasmine.createSpyObj('valueService', ['getValue']);
    valueServiceSpy.getValue.and.returnValue('spy React');
    

    expect(masterService.getValue()).toBe('spy React');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });

  // it('should be return \"Angular\" from real service', () => {
  //   const valueService = new ValueService();
  //   const masterService = new MasterService(valueService);

  //   expect(masterService.getValue()).toBe('Angular');
  // });

  // it('should be return \"React\" from fake service', () => {
  //   const fakeValueService = new FakeValueService();
  //   const masterService = new MasterService(fakeValueService as unknown as ValueService);

  //   expect(masterService.getValue()).toBe('React');
  // });

  // it('should be return \"React\" from fake object', () => {
  //   const fake = {
  //     getValue: () => 'React'
  //   };
  //   const masterService = new MasterService(fake as ValueService);

  //   expect(masterService.getValue()).toBe('React');
  // });

  
});
