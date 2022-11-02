import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TripsordersService } from '../../../../core/services/tripsorders/tripsorders.service'
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';
import { PassArrayService } from 'src/app/core/services/pass-array.service';

@Component({
  selector: 'app-my-trip',
  templateUrl: './my-trip.component.html',
  styleUrls: ['./my-trip.component.scss']
})
export class MyTripComponent implements OnInit {

  orders: any;
  orderNo: any;
  status: any;
  noOfBags: any;
  date: any;
  from: any;
  to: any;
  price: any;
  public loading = false;
  custId: any;

  constructor(private cdr:ChangeDetectorRef, private TripsordersService: TripsordersService, private Router:Router, private passArray: PassArrayService) {
  }

  count : any = 1;

  ngOnInit() {
    this.custId = JSON.parse(localStorage.getItem('loginUserDetails'));
    this.getOrdersAndTripsWithPage(1);
    window.scroll(0, 0);

    this.passArray.passCancelFlag('');
  }


  getOrdersAndTripsWithPage(count){
    window.scroll(0, 0);
    this.loading = true;
    this.cdr.detectChanges()
    let obj = {"id_customer": this.custId.customer_detail.id_customer}
    this.TripsordersService.getOrdersAndTrips(obj, count).subscribe(orders => {
        this.orders = orders['booking_data'];
        this.loading = false;
    }, err => {
      this.loading = false;
    });
  }


  previous(count) {
    if (this.count > 0) {
      this.count--;
      this.getOrdersAndTripsWithPage(this.count);
    }
  }

  next(count) {
    this.count++;
    this.getOrdersAndTripsWithPage(this.count);
  }

  public reBook(data){
       localStorage.orderObj = JSON.stringify(data);
    this.Router.navigate(['/my-orders'])
  }
}
