import { TripsordersService } from './../../../../../core/services/tripsorders/tripsorders.service';
// import { CrudService } from 'src/app/core/services/crud.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
// import { filter } from 'rxjs/operators';
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { OrderStatusComponent } from "../order-status/order-status.component";
// import { apis } from 'src/app/config/apis';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.scss"],
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  custId: any;
  imgSrc: string;
  order_not_found:any = false;

  constructor(public dialog: MatDialog,public router:ActivatedRoute,public ngxSpinner:NgxSpinnerService,public TripsordersService:TripsordersService,public _snackbar: MatSnackBar,) {}

  ngOnInit() {
    this.router.params.subscribe((res) => {
      console.log(res,'router');
      res.order_number ? this.getOrderDetail(res.order_number) : null
    })
    // this.order = JSON.parse(localStorage.getItem("order_detail"));
    window.scroll(0, 0);
  }

  onClick(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var srcAttr = target.attributes.src;
    this.imgSrc = srcAttr.nodeValue;
  }

  orderStatus() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OrderStatusComponent, {
      width: "600px",
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      // this.animal = result;
    });
  }

  // pickup address
  getPickupAddress(order) {
    if(order.order.service_type_str == "Arrival" && order.order.order_transfer == "2"){
      if(order.order.corporate_type_str == "Corporate General Order" || 
        order.order.corporate_type_str == "MHL Corporate Order" ||
        order.order.corporate_type_str == "ThirdParty Corporate Order" ||
        order.order.corporate_type_str == "Subscription Order"){
          if((Number(order.order.corporate_type) == 1 &&
              Number(order.order.order_transfer) == 1) ||
              (Number(order.order.corporate_type) == 3 &&
              order.order.order_type_str == "Cargo Transfer")){
              return ((order.order.pickupPersonAddressLine1)+ " " + (order.order.pickupPersonAddressLine2)+ " " +
              (order.order.pickarea ? order.order.pickarea : "") + " " + (order.order.pickupPincode))
          }else{
              return (order.order.airport_name ? order.order.airport_name : "")
          }
      }else {
        return  "-" 
      }
    }else{
      if(order.order.corporate_type_str == "Corporate General Order" ||
        order.order.corporate_type_str == "MHL Corporate Order" ||
        order.order.corporate_type_str == "ThirdParty Corporate Order" ||
        order.order.corporate_type_str == "Subscription Order"){
          if((Number(order.order.corporate_type) == 1 &&
            Number(order.order.order_transfer) == 1) ||
            (Number(order.order.corporate_type) == 3 &&
            order.order.order_type_str == "Cargo Transfer")){
              return ((order.order["pickupPersonAddressLine1"] ? order.order["pickupPersonAddressLine1"] : '') + " " + 
                     (order.order["pickupPersonAddressLine2"] ? order.order["pickupPersonAddressLine2"] : '') + " " + 
                     (order.order["pickarea"] ? order.order["pickarea"] : "") + " " +
                     (order.order["pickupPincode"] ? order.order["pickupPincode"] : ''))
          }else{
            return ((order.order["building_number"] ? order.order["building_number"] : "") + " " +
                    (order.order["location_address_line_1"] ? order.order["location_address_line_1"] : "") + " " +
                    (order.order["location_address_line_2"] ? order.order["location_address_line_2"] : "") + " " +
                    (order.order["landmark"] ? order.order["landmark"] : "")  + " " +
                    (order.order["location_area"] ? order.order["location_area"] : "")  + " " +
                    (order.order["location_pincode"] ? order.order["location_pincode"] :""))
          }
      }else{
        return  "-" 
      }
    }
  }

  // delivery address
  getDeliveryAddress(order){
    if(order.order["service_type_str"] == "Arrival" && order.order["order_transfer"] == "2"){
      if(order.order["corporate_type_str"] == "Corporate General Order" ||
        order.order["corporate_type_str"] == "MHL Corporate Order" ||
        order.order["corporate_type_str"] == "ThirdParty Corporate Order" ||
        order.order["corporate_type_str"] == "Subscription Order"){
          if((Number( order.order["corporate_type"]) == 1 &&
              Number( order.order["order_transfer"]) == 1) ||
              (Number( order.order["corporate_type"]) == 3 &&
              order.order["order_type_str"] == "Cargo Transfer") ){
              return ((order.order["dropPersonAddressLine1"]?order.order["dropPersonAddressLine1"]:'')+ " " +
                     (order.order["dropPersonAddressLine2"] ? order.order["dropPersonAddressLine2"] : '') + " " +
                     (order.order["droparea"] ?order.order["droparea"] : "") + " " +
                     (order.order["dropPincode"] ? order.order["dropPincode"] : ''))
          }else{
              return ((order.order["building_number"] ? order.order["building_number"] : "") + " " +
                      (order.order["location_address_line_1"] ? order.order["location_address_line_1"] : "")+ " " +
                      (order.order["location_address_line_2"] ? order.order["location_address_line_2"] : "")+ " " +
                      (order.order["landmark"] ? order.order["landmark"] : "")+ " " +
                      (order.order["location_area"] ? order.order["location_area"] : "")+ " " +
                      (order.order["location_pincode"] ? order.order["location_pincode"] : ""))
          }
      }else {
        return  "-" 
      }
    }else{
      if(order.order["corporate_type_str"] == "Corporate General Order" ||
        order.order["corporate_type_str"] == "MHL Corporate Order" ||
        order.order["corporate_type_str"] == "ThirdParty Corporate Order" ||
        order.order["corporate_type_str"] == "Subscription Order"){
          if(((Number(order.order["corporate_type"]) == 1 &&
              Number(order.order["order_transfer"]) == 1) ||
              (Number(order.order["corporate_type"]) == 3 &&
              order.order["order_type_str"] == "Cargo Transfer"))){
              return ((order.order["dropPersonAddressLine1"])+ " " +
                      (order.order["dropPersonAddressLine2"])+ " " +
                      (order.order["droparea"] ? order.order["droparea"]: "")+ " " +
                      (order.order["dropPincode"]))
          }else{
            return (order.order["airport_name"])
          }
      }else{
        return  "-" 
      }
    }
  }

  getTimeSlots(order){
    return (Number(order.order["airport_service"]) == 1
            ? order.order["airport_slot_time"]
            : ((order.order["slot_start_time"] ? order.order["slot_start_time"] : '') + "-" +(order.order["slot_end_time"] ? order.order["slot_end_time"] : '')))
  }

  getPrice(order){
    return (Math.round(Number(order.order['amount_paid'])) <= 0 ?
            Math.round(Number(order.order['luggage_price'] ? order.order['luggage_price'] : 0)) : 
            // 'Prepaid':
            Math.round(Number(order.order['amount_paid'] ? order.order['amount_paid'] : 0)))
  }

  check_image_availability(order:any, item){
    if(order.length == 0){
      return true
    }else{
      let array = [];
      let type = (item == 'Damaged' ? true :  false);
      if(type){
        array = order.filter(res=> res.before_after_damaged == 2)
        return (array.length == 0 ? true : false)
      }else{
        array = order.filter(res=> res.before_after_damaged == 0 || res.before_after_damaged == 1 || res.before_after_damaged == 3)
        return (array.length == 0 ? true : false)
      }
      
    }
  }

  getOrderDetail(order_id){
    let login = JSON.parse(localStorage.loginUserDetails ?localStorage.loginUserDetails : null);
    
    this.ngxSpinner.show();
    let reqBody = {
      id_order: order_id,
      id_customer: login ? login.customer_detail.id_customer : '',
      corporate_orders:"",
    }

    this.TripsordersService
      .getOrderDetails(reqBody)
      .subscribe((res: any) => {
        if (res.status) {
         this.order = res.booking_data;
        }else{
          this.order_not_found = true
          this.printToastMsg(res.message)
        }
        this.ngxSpinner.hide();
      },(err)=> {this.order_not_found = true; this.ngxSpinner.hide();});
  }

  printToastMsg(msg) {
    this._snackbar.open(msg, "X", {
      duration: 5000,
      verticalPosition: "top",
      panelClass: "custom-snackbar",
    });
  }

}
// {}