import { Component, OnInit, HostListener } from '@angular/core';
import { PassArrayService } from 'src/app/core/services/pass-array.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  carterXtype: any = 1;

  constructor(
    public passArray: PassArrayService
  ) { }

  scrollDown: boolean = true;

  @HostListener('window:scroll', ['$event'])
  doSomething(event) {
    if (window.pageYOffset > 200) {
      this.scrollDown = false;
    }
    else {
      this.scrollDown = true;
    }
  }


  ngOnInit() {
    window.scroll(0, 0);
    localStorage.removeItem('localOutstationFlag');
    localStorage.removeItem('userInput');
    localStorage.removeItem('toFromFlag');
    localStorage.removeItem('luggageData');
    localStorage.removeItem('userAddress');
    localStorage.removeItem('contactDetails');
    localStorage.removeItem('pickupContactDetails')
    localStorage.removeItem('keepArrayOfluggae');
    localStorage.removeItem('keepweightOfLuggage');
    localStorage.removeItem('selectedDate');
    localStorage.removeItem('saveObj');
    localStorage.removeItem('noOfBags');
    localStorage.removeItem('orderSub');
    localStorage.removeItem('outstationResponse');
    localStorage.removeItem('outStationArray');
    localStorage.removeItem('deliveryDate');
    localStorage.removeItem('region_id');
    localStorage.removeItem('showDate');
    localStorage.removeItem('timeOnwards');
    localStorage.removeItem('insurancePrice');
    localStorage.removeItem('totalPrice');
    localStorage.removeItem('keepDate');
    localStorage.removeItem('dateRefresh');
    localStorage.removeItem('pickupCC');
    localStorage.removeItem('deliveryCC');
    localStorage.removeItem('ccToSend');
    localStorage.removeItem('orderSubNew');
    localStorage.removeItem('showDateSecondPage');
    localStorage.removeItem('pickupFromLocal');
    localStorage.removeItem('deliveryFromLocal');
    localStorage.removeItem('keepDateFrom');
    localStorage.removeItem('fromDate');
    localStorage.removeItem('nextDate');
    this.passArray.carterxtype.subscribe(carterxType => this.carterXtype = carterxType);
  }

}
