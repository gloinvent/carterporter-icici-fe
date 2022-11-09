import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CrudService } from "src/app/core/services/crud.service";

@Component({
  selector: "app-subscription-confirmation",
  templateUrl: "./subscription-confirmation.component.html",
  styleUrls: [
    "./subscription-confirmation.component.scss",
    "../order-confirm/order-confirm.component.scss",
  ],
})
export class SubscriptionConfirmationComponent implements OnInit {
  subcription: any = [];

  constructor() {}
  
  ngOnInit() {
    this.subcription = JSON.parse(localStorage.getItem('subscription_details'));
  }

  ngAfterViewInit() {
    setTimeout(()=>{window.scrollTo(0, 0);},200)
  }
}



// {
//   subcription_name: "prashant",
//   confirmation_number: "12345",
//   number_of_usages: "5",
//   expiry_date: "7/11/2023",
// },
// {
//   subcription_name: "prashant",
//   confirmation_number: "12345",
//   number_of_usages: "5",
//   expiry_date: "7/11/2023",
// },
// {
//   subcription_name: "prashant",
//   confirmation_number: "12345",
//   number_of_usages: "5",
//   expiry_date: "7/11/2023",
// },
// {
//   subcription_name: "prashant",
//   confirmation_number: "12345",
//   number_of_usages: "5",
//   expiry_date: "7/11/2023",
// },
// {
//   subcription_name: "prashant",
//   confirmation_number: "12345",
//   number_of_usages: "5",
//   expiry_date: "7/11/2023",
// },