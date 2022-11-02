import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassWeightService {

  private indexSource = new BehaviorSubject('');
  private changeStatus = new BehaviorSubject(false);
  currentIndex = this.indexSource.asObservable();
  insuranceButton = this.changeStatus.asObservable();

  constructor() { }

  changeIndex(index: any) {
    console.log(index);
    this.indexSource.next(index);
  }


  changeStatusInsuarance(status: any) {
    console.log(status);
    this.changeStatus.next(status);
  }
}
