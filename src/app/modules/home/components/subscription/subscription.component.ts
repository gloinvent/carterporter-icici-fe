import { CrudService } from 'src/app/core/services/crud.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BuySubscriptionComponent } from './../buy-subscription/buy-subscription.component';
import { Component, NgZone, OnInit } from '@angular/core';
import {
  MatDialog,
} from "@angular/material/dialog";
import { SubscriptionService } from "src/app/core/services/subscription/subscription.service";
import { apis, subscription } from './../../../../config/apis';
import { environment } from 'src/environments/environment';
import { UtilService } from 'src/app/core/services/util.service';
import { MatSnackBar } from '@angular/material';
import { PassArrayService } from 'src/app/core/services/pass-array.service';

declare var Razorpay: any;

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  price:any;
  purchase_details:any;
  subscription_list:any = [];
  isLogin:any=false;

  constructor(
    public dialog: MatDialog,
    private subscriptions:SubscriptionService,
    private razorPays: UtilService,
    private ngZone: NgZone,
    private ngxSpinner:NgxSpinnerService,
    private router:Router,
    private crudService:CrudService,
    private toast: MatSnackBar,
    private tokens: PassArrayService,
    ) { 
      this.tokens.getNameOFUser.subscribe((name) => {
        name ? (this.isLogin = true) : null;
      });
    }

  ngOnInit() {
    this.razorPays.lazyLoadLibrary("https://checkout.razorpay.com/v1/checkout.js").subscribe();
    this.getSubscriptionList();
    if(localStorage.loginUserDetails) {
      this.isLogin = true;
    }
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
  // if login buy subscription

   // proceed to pay
   proceedToPay(){
    let login_information = JSON.parse(localStorage.loginUserDetails);
    
    let options = {
      key: environment.razorPayKey,
      amount:  Number(this.getPrice()) * 100 ,
      currency: "INR",
      name: "CarterPorter",
      description: "Payment towards Carter",
      image: "https://cdn.razorpay.com/logos/Du4P7LfElD9azm_medium.jpg",
  
      handler: (response) => {
        this.ngZone.run(() =>{
          this.create_subscription(response.razorpay_payment_id);
        })
        
      },
      prefill: {
        name: login_information.customer_detail.name,
        email: login_information.customer_detail.email,
        contact: login_information.customer_detail.mobile,
      },
      notes: {
        address: "note value",
      },
      theme: {
        color: "#F37254",
      },
      config: {
        display: {
          blocks: {
            icic: {
              name: "Pay using ICIC Bank",
              instruments: [
                {
                  method: "card",
                  issuers: ["ICIC"]
                },
                {
                  method: "netbanking",
                  banks: ["ICIC"]
                },
              ]
            },
          },
          hide: [
            {
            method: "upi"
            }
          ],
          sequence: ["block.icic"],
          preferences: {
            show_default_blocks: false
          }
        }
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();  
  }
 
  //create confirmation 
  create_subscription(tranaction_id) {
    this.ngxSpinner.show();
    const reqBody = this.paylode_reqBody();
    
    let purchase_info = [];
    if(this.subscription_list && this.subscription_list.length != 0){
      this.subscription_list.map((res)=>{
        if(res.count !=0){
          purchase_info.push({
            "subscription_id": res.subscription_id,
            "no_of_useage":res.no_of_usages,
            "unit":res.count,
            "total_amount":  Number(res.count) * Number((res.subscription_cost)),
            "status":"paid",
            "transaction_id": tranaction_id,
          })
        }
      })
    }

    reqBody['purchase_detail'] = purchase_info
    this.subscriptions.subscription_validation(subscription.PURCHASE_SUBSCRIPTION,reqBody).subscribe((res:any)=>{
      if(res.status && res.status == true && res.result.msg != 'something went wrong'){
        // this.dialogRef.close();
        localStorage.setItem('subscription_details',JSON.stringify(res.result.subscription_detail));
        this.login_usr_details(res.result.subscription_detail);
        this.router.navigateByUrl('/subscription-confirmation');
        this.subscriptions.subscription_validation(subscription.SENDEMAIL,res.result.session_array).subscribe((res:any)=>{
          console.log(res,'------')
        })
      }
      console.log('respose',res)
      this.ngxSpinner.hide();
    },err=>{this.ngxSpinner.hide();})     
  }


  // verify user is existing or not
  verify_user(){
    this.ngxSpinner.show();
      const reqBody = this.paylode_reqBody();
      this.subscriptions.subscription_validation(subscription.PURCHASE_SUBSCRIPTION_VERIFY_USER,reqBody).subscribe((res:any)=>{
        if(res.result.res_status == 201){
          this.openDialog();
        }else if(res.result.res_status == 200){
          this.proceedToPay();
        }
        this.ngxSpinner.hide();
        res.result.res_status == 200 ? null : this.printToastMsg(res.result.msg)
        console.log(res);
    },err=>{ this.ngxSpinner.hide();});
  }


  login_usr_details(response:any){

    let loginDetails = {
      "status": true,
      "message": "Number Verified Successfully",
      "customer_detail": {
        "id_customer": response[0].id_customer,
        
        "name": response[0].name,
        "email": response[0].email,
        "mobile": response[0].mobile,
        "fk_tbl_customer_id_country_code": response[0].fk_tbl_customer_id_country_code ,
        "id_country_code": response[0].fk_tbl_customer_id_country_code,
        "mobile_number_verification": "1",
        "client_id": response[0].client_id,
        "client_secret": response[0].client_secret,
      },
      "saved_address": {
        "registered_address": {},
        "last_order_address": false
      }
    }

    localStorage.setItem('loginUserDetails', JSON.stringify(loginDetails));
    this.tokens.newEventFordata('LoggedIn!');
    
    this.accessTokenApi({
      client_id: response[0].client_id,
      client_secret: response[0].client_secret,
      grant_type: 'client_credentials'
    });
  }

  accessTokenApi(obj) {
    this.crudService.getToken(apis.GET_LOGIN_TOKEN, obj).subscribe((response:any) => {
      if (response) {
        localStorage.setItem('accessToken', response.access_token);
        this.tokens.passToken(response.access_token);
        localStorage.setItem('carterXAccessToken',response.access_token);
      }
    });
    this.tokens.newEventFordata('LoggedIn!');
  }

  printToastMsg(msg) {
    this.toast.open(msg, "X", {
      duration: 5000,
      verticalPosition: "top",
      panelClass: "custom-snackbar",
    });
  }

  paylode_reqBody(){
    let login_information = JSON.parse(localStorage.loginUserDetails);
    // let formValue = { ...this.subscriptionForm.value }
    const reqBody = {
      email : login_information.customer_detail.email,
      mobile : login_information.customer_detail.mobile,
      name : login_information.customer_detail.name,
      country_code : login_information.customer_detail.fk_tbl_customer_id_country_code,
    }
    return reqBody
  }


}
