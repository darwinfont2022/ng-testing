import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  center = { lat: 0, lng: 0 };

  constructor() { }

  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((response) => {
        const { latitude, longitude } = response.coords;
        this.center = { lat: latitude, lng: longitude };
      });
    });
  }
}
