import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { CrudService } from "src/app/core/services/crud.service";

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {

  roundTripOneOrderId: any;
  serviceType: any;
  showRoundTrip: any;
  roundTripTwoOrderId: any = [];
  orders: any;
  singleAirport: any = [];
  secondAirport: any = [];
  tab_type: any;
  order_from:any;

  constructor(private router: Router, private crudService: CrudService) {
    this.orders = JSON.parse(localStorage.getItem("order"))
    this.order_from = localStorage.getItem("order_from");
    console.log(this.orders,'------',this.order_from);
    // this.serviceType = parseInt(localStorage.getItem("serviceType"));
    // this.showRoundTrip = parseInt(localStorage.getItem("showRoundTrip"));
    // this.tab_type = localStorage.getItem("tabType");
    // console.log("this.orders", this.orders);
  }

  ngOnInit() {
    // this.roundTripOneOrderId = this.orders.split(",");
    // this.extractAirportInformation();
    // localStorage.getItem("firstAirport");
  }

  // downloadPdf() {
  //   this.crudService
  //     .get("r=order/orderpdf&order_number=" + this.roundTripOneOrderId)
  //     .subscribe((res: any) => {
  //       console.log(res);
  //       if (res.status) {
  //         window.open(res.path, "_blank");
  //       }
  //     });
  // }

  // extractAirportInformation() {
  //   if (localStorage.getItem("firstAirport") !== "") {
  //     const airportDescShow = localStorage.getItem("firstAirport").split("&");
  //     for (const a of airportDescShow) {
  //       const airportContent = a.split(":");
  //       this.singleAirport.push(airportContent);
  //     }
  //   }
  //   console.log(
  //     "localStorage.getItem(secondAirport",
  //     localStorage.getItem("secondAirport")
  //   );
  //   if (localStorage.getItem("secondAirport") !== "") {
  //     const airportDescShow = localStorage.getItem("secondAirport").split("&");
  //     for (const a of airportDescShow) {
  //       const airportContent = a.split(":");
  //       this.secondAirport.push(airportContent);
  //     }
  //   }

  //   console.log("singleAirport", this.singleAirport);
  // }

  // navi() {
  //   window.open("https://webdev.carterx.in/home");
  // }
}
