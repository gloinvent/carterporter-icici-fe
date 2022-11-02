import { BuySubscriptionComponent } from './../buy-subscription/buy-subscription.component';
import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
} from "@angular/material/dialog";
import { SubscriptionService } from "src/app/core/services/subscription/subscription.service";
import { subscription } from './../../../../config/apis';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  price:any;
  purchase_details:any;
  subscription_list:any = [];

  constructor(public dialog: MatDialog,private subscriptions:SubscriptionService) { }

  ngOnInit() {
    this.getSubscriptionList();
  }


  openDialog(){
    const dialogRef = this.dialog.open(BuySubscriptionComponent, {
      width: "300px",
      panelClass : "register-modal",
      data: {price: Number(this.getPrice()) , subscription_details: this.subscription_list}
    });

    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case "loginFromRegister": {
          break;
        }
        case "closeRegister": {
          break;
        }
        case "privacyTerms": {
          this.onNoClick();
          break;
        }
      }
    });
  }

  onNoClick() {
    
  }

  getSubscriptionList(){
    this.subscriptions.get_subscription_details(subscription.SUBSCRIPTION_LIST).subscribe((res:any)=>{
      // || value.subscriber_name == 'Prestige Plus'
      // ICICI Prestige
      // Amex Prestige
      this.subscription_list = res.subscription_detail.filter((value)=>{ return value.subscriber_name == 'ICICI Prestige'})
      this.subscription_list.length !=0 ?  this.subscription_list.map((response)=>{
        response.count = 0;
        response.price_with_gst = (Number(response.subscription_cost)*  Number(response.subscription_GST) / 100);
        response.subscription_cost = Math.round(Number(response.price_with_gst) + Number(response.subscription_cost));
      }) : null  
    })
   
  }

  purchaseSubscription(type,name){
    switch(type){
      case 'remove':
        this.subscription_list.map((res:any)=>{
          if(res.subscriber_name == name){
            res.count != 0 ? res.count -= 1 : ''
          }
        })
        break;
      case 'add':
        this.subscription_list.map((res:any)=>{
          if(res.subscriber_name == name){
            res.count < 8 ? res.count += 1 : ''
          }
        })
        break;
    }
  }

  getPrice(){
    let amount = 0;
    if(this.subscription_list.length != 0){
      this.subscription_list.map((res:any)=>{
        let price = 0;
        res.count != 0 ? price = (res.count ? res.count : 0) * Number(res.subscription_cost) : null
        // console.log('entered...',amount,'----',res.count,'----',res.subscription_cost)
        amount = amount + price ;
      })
    }
    return amount;
  }

}
