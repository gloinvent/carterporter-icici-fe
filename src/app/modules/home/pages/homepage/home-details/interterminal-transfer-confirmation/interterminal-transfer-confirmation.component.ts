import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { CrudService } from "src/app/core/services/crud.service";

@Component({
  selector: 'app-interterminal-transfer-confirmation',
  templateUrl: './interterminal-transfer-confirmation.component.html',
  styleUrls: ['./interterminal-transfer-confirmation.component.scss']
})
export class InterterminalTransferConfirmationComponent implements OnInit {

  roundTripOneOrderId: any;
  serviceType: any;
  showRoundTrip: any;
  roundTripTwoOrderId: any = [];
  orders: any;
  singleAirport:any = [];
  secondAirport:any = [];
  tab_type:any;

  constructor(private router: Router, private crudService: CrudService) {
    this.orders = localStorage.getItem("roundTripOneOrderId");
    this.serviceType = parseInt(localStorage.getItem("serviceType"));
    this.showRoundTrip = parseInt(localStorage.getItem("showRoundTrip"));
    this.tab_type = localStorage.getItem("tabType");
    console.log("this.orders",this.orders);
  }

  ngOnInit() {
    this.roundTripOneOrderId = this.orders.split(',');
    console.log("roundTripOneOrderId", this.roundTripOneOrderId);
    this.extractAirportInformation();
    localStorage.getItem("firstAirport");
    scrollTo(0, 0);
  }

  downloadPdf() {
    this.crudService
    .get("r=order/orderpdf&order_number=" + this.roundTripOneOrderId)
    .subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        window.open(res.path, "_blank");
      }
    });
  }

  extractAirportInformation() {
    if (localStorage.getItem("firstAirport") !== "") {
      const airportDescShow = localStorage.getItem("firstAirport").split("&");
      for (const a of airportDescShow) {
        const airportContent = a.split(":");
        this.singleAirport.push(airportContent);
      }
    }
    console.log("localStorage.getItem(secondAirport",localStorage.getItem("secondAirport"));
      if (localStorage.getItem("secondAirport") !== "") {
        const airportDescShow = localStorage.getItem("secondAirport").split("&");
        for (const a of airportDescShow) {
          const airportContent = a.split(":");
          this.secondAirport.push(airportContent);
        }
      }

    console.log("singleAirport",this.singleAirport);
  }

  navi(){
    window.open("https://webdev.carterx.in/home")
  }

}
