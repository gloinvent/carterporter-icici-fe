import { Component, OnInit } from '@angular/core';
import { TripsordersService } from '../../../../../../core/services/tripsorders/tripsorders.service';

@Component({
  selector: 'app-new-confirmation-page',
  templateUrl: './new-confirmation-page.component.html',
  styleUrls: ['./new-confirmation-page.component.scss']
})
export class NewConfirmationPageComponent implements OnInit {

  constructor(
    public TripsordersService: TripsordersService,
  ) { }
  order_id: any;
  toOrfrom: any;
  path: any;
  ngOnInit() {
    this.order_id = localStorage.getItem('order');
    this.toOrfrom = localStorage.getItem('toOrfrom');
    this.TripsordersService.getOrdersInvoicePdf(this.order_id).subscribe(pdf => {
      this.path = pdf['path'];
      console.log("this.path", this.path);
      console.log(pdf["path"]);
    }, err => {
    });
  }

  navi(){
    window.open("https://webdev.carterx.in/home")
  }

}
