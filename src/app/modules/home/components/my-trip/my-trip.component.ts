import { DownlodeCsvComponent } from './../track-order/downlode-csv/downlode-csv.component';
import { CrudService } from "src/app/core/services/crud.service";
import { OrderDetailsComponent } from "./../track-order/order-details/order-details.component";
import { HelpAssistanceComponent } from "./../track-order/help-assistance/help-assistance.component";
import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { TripsordersService } from "../../../../core/services/tripsorders/tripsorders.service";
import { Router, RouterModule } from "@angular/router";
import { MatDialog, MatStepper } from "@angular/material";
import { ConfirmModalComponent } from "src/app/shared/modals/confirm-modal/confirm-modal.component";
import { PassArrayService } from "src/app/core/services/pass-array.service";
import { NgxSpinnerService } from "ngx-spinner";
import { apis } from "src/app/config/apis";

@Component({
  selector: "app-my-trip",
  templateUrl: "./my-trip.component.html",
  styleUrls: ["./my-trip.component.scss"],
})
export class MyTripComponent implements OnInit {
  @ViewChild("stepper", { static: false }) stepper: MatStepper;
  order: any = [];
  currentStep: any = 0;
  orders: any = [];
  orderNo: any;
  status: any;
  noOfBags: any;
  date: any;
  from: any;
  to: any;
  price: any;
  public loading = false;
  custId: any;
  total_page_count: any = 0;
  search_order_no: any
  is_search_order: any = false

  no_data_found= false;

  constructor(
    private cdr: ChangeDetectorRef,
    private ngxSpinner: NgxSpinnerService,
    private TripsordersService: TripsordersService,
    public crud: CrudService,
    private Router: Router,
    public modal: MatDialog,
    private passArray: PassArrayService
  ) {
    this.passArray.callTrackOrder.subscribe((res: any) => {
      if (res == "success") {
        this.getOrdersAndTripsWithPage(this.count);
      }
    });
  }

  count: any = 1;

  ngOnInit() {
    this.custId = JSON.parse(localStorage.getItem("loginUserDetails"));
    if (localStorage.loginUserDetails) {
      // console.log('enetereddddd')
      this.accessTokenApi();
    }
    // this.getOrdersAndTripsWithPage(1);
    window.scroll(0, 0);
    this.passArray.passCancelFlag("");
    // this.order = JSON.parse(localStorage.getItem("order_detail"));
    // window.scroll(0, 0);
  }

  getOrdersAndTripsWithPage(count) {
    window.scroll(0, 0);
    this.ngxSpinner.show();
    this.cdr.detectChanges();
    let obj = { 
      id_customer: this.custId.customer_detail.id_customer,
      corporate_orders:0,
      order_number: this.search_order_no && this.is_search_order ? this.search_order_no : null,
      airline_id:'',
     };
    this.TripsordersService.getOrdersAndTrips(obj, count).subscribe(
      (orders) => {
        this.orders = orders["booking_data"];
        this.total_page_count = Math.ceil(Number(orders["total_count"]) / 10);
        this.ngxSpinner.hide();
        this.orders.length == 0 ? this.no_data_found = true : null
        setTimeout(()=>{this.check_cancel_order()},200)
      },
      (err) => {
        this.no_data_found = true
        this.ngxSpinner.hide();
      }
    );
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

  // public reBook(data) {
  //   localStorage.orderObj = JSON.stringify(data);
  //   // this.Router.navigate(['/my-orders'])
  // }

  navigate_orderDetail(item) {
    localStorage.setItem("order_detail", JSON.stringify(item));
  }

  openHelpModal(order_detail) {
    const dialogRef = this.modal.open(HelpAssistanceComponent, {
      width: "320px",
      data: { order_detail: order_detail },
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      // this.animal = result;
    });
  }

  openOrderDetailModal(order_detail) {
    const dialogRef = this.modal.open(OrderDetailsComponent, {
      width: "90vh",
      height: "90vh",
      data: { order_detail: order_detail },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  showTicket(ticket) {
    // localStorage.setItem("ticket_details", JSON.stringify(ticket));
    // this.Router.navigateByUrl('/help-details');
    window.open("/help-details/" + ticket[0].order_id, "_blank");
  }

  accessTokenApi() {
    this.ngxSpinner.show();
    let login_details = JSON.parse(localStorage.getItem("loginUserDetails"));
    // console.log(login_details,'login_details')

    let reqBody = {
      client_id: login_details["customer_detail"].client_id,
      client_secret: login_details["customer_detail"].client_secret,
      grant_type: "client_credentials",
    };

    this.crud.getToken(apis.GET_LOGIN_TOKEN, reqBody).subscribe(
      (response: any) => {
        // this.ngxSpinner.hide();
        if (response) {
          const key = "accessToken";
          localStorage.setItem(key, response.access_token);
          this.passArray.passToken(response.access_token);
          localStorage.setItem("carterXAccessToken", response.access_token);
          this.getOrdersAndTripsWithPage(1);
        }
      },
      (err) => {
        this.ngxSpinner.hide();
      }
    );
  }

  getPrice(order) {
    return Math.round(Number(order.order["amount_paid"])) <= 0
      ? Math.round(
          Number(
            order.order["luggage_price"] ? order.order["luggage_price"] : 0
          )
        )
      : // 'Prepaid':
        Math.round(
          Number(order.order["amount_paid"] ? order.order["amount_paid"] : 0)
        );
  }

  getSelectedIndex(status) {
    let currentStep;
    if (status.length != 0) {
      status.map((res, i) => {
        if (res.status == 1) {
          currentStep = i;
        }
      });
      return currentStep;
    } else {
      return false;
    }
  }

  check_cancel_order(){
    let element:any = document.querySelectorAll('mat-step-header');
    if(element && element.length !=0){
      for(let i=0;i<=element.length-1;i++){
        if(document.querySelectorAll('mat-step-header')[i].getAttribute('ng-reflect-label') == 'Cancelled' || document.querySelectorAll('mat-step-header')[i].getAttribute('ng-reflect-label') == 'Cancelled with Refund' || document.querySelectorAll('mat-step-header')[i].getAttribute('ng-reflect-label') == 'Rescheduled'){
            document.querySelectorAll('mat-step-header')[i].querySelector('.mat-step-icon')['style'].background='red'
          }
      }
    }
  }

  openDownloadCsv() {
    const dialogRef = this.modal.open(DownlodeCsvComponent, {
      width: "350px",
      // height: "270px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  search_order() {
    if (this.search_order_no) {
      // if (!this.is_search_order) {
        this.is_search_order = true
        this.accessTokenApi()
      // } else {
      //   this.search_order_no = '';
      //   this.count = 1;
      //   this.is_search_order = false
      //   this.accessTokenApi();
      // }
    } else {

    }
  }

  search_order_valueChange(event) {
    if (event == '' && this.is_search_order) {
      this.search_order_no = '';
      this.count = 1;
      this.is_search_order = false
      this.accessTokenApi();
    }
  }

  remove_search_value(){
        this.search_order_no = '';
        this.count = 1;
        this.is_search_order = false
        this.accessTokenApi();
    } 

}
