import { TestBed } from '@angular/core/testing';

import { MapService } from './map.service';

describe('MapService', () => {
  let mapService: MapService;

  

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapService]
    });
    mapService = TestBed.inject(MapService);
  });

  describe('MapService', () => {
    it('should save the center', () => {

      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(function(success) {
        const mockGeolocation = {
          coords: {
            accuracy: 0,
            altitude: 0,
            altitudeAccuracy: 0,
            heading: 0,
            latitude: 100,
            longitude: 200,
            speed: 0,
          },
          timestamp: Date.now()
        }
        success(mockGeolocation);
      });
      mapService.getCurrentPosition();
      expect(mapService.center).toEqual({lat: 100, lng: 200});
    });
  });

  it('should be created', () => {
    expect(mapService).toBeTruthy();
  });
});
