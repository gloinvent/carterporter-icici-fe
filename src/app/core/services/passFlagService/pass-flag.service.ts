import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassFlagService {

  data: any;

  constructor() { }

  setOption(value: any) {
    this.data = value;
  }
  getOption() {
    return this.data;
  }
}
