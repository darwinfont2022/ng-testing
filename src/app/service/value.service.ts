import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {
  private value = 'Angular';

  constructor() { }
  getValue() {
    return this.value;
  }
  setValue(value: string) {
    this.value = value;
  }
  getPromiseValue() {
    return Promise.resolve('promise value');
  }
  getObservableValue() {
    return of('obserbvble value');
  }
}
