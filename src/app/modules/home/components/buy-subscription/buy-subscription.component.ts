import { Router } from '@angular/router';
import { subscription } from './../../../../config/apis';
import { Component, Inject, NgZone, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { apis } from "src/app/config/apis";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CrudService } from "src/app/core/services/crud.service";
import { MatSnackBar } from "@angular/material";
import { PassArrayService } from "src/app/core/services/pass-array.service";
import { SubscriptionService } from "src/app/core/services/subscription/subscription.service";
import { UtilService } from 'src/app/core/services/util.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

declare var Razorpay: any;

@Component({
  selector: "app-buy-subscription",
  templateUrl: "./buy-subscription.component.html",
  styleUrls: [
    "./buy-subscription.component.scss",
    "../../../../shared/modals/register/register.component.scss",
  ],
})
export class BuySubscriptionComponent implements OnInit {

  subscriptionForm: FormGroup;
  showCountryCode: any;
  otp_details:any = {
    show_otp : false,
    verify_otp : false,
    validate_otp : false
  }

  constructor(
    public dialogRef: MatDialogRef<BuySubscriptionComponent>,
    private fb: FormBuilder,
    private crudService: CrudService,
    private subscriptions: SubscriptionService,
    private ngxSpinner: NgxSpinnerService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {price: any, subscription_details:any},
    private razorPays: UtilService,
    private ngZone: NgZone,
    private router:Router,
    private toast: MatSnackBar,
  ) {}

  ngOnInit() {
    this.razorPays.lazyLoadLibrary("https://checkout.razorpay.com/v1/checkout.js").subscribe();
    this.createForm();
    this.getCountryCode();
  }

  // create form
  createForm(){
    this.subscriptionForm = this.fb.group({
      name: ["", Validators.required],
      mobile: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9]+"),],],
      email: ["", Validators.compose([ Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),]),],
      country_code: ["91"],
      otp: ['']
    });
  }

  // get country code
  getCountryCode() {
    this.crudService.get(apis.COUNTRY_CODES).subscribe((data:any) => {this.showCountryCode = data.codes;});
  }

  // select country code
  selectedCountryCode(arg) {
    this.subscriptionForm.controls['country_code'].setValue(arg)
  }

  // proceed to pay
  proceedToPay(){
    let formValue = { ...this.subscriptionForm.value }
    let options = {
      key: environment.razorPayKey,
      amount:  Number(this.data.price) * 100 ,
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
        name: formValue.name,
        email: formValue.email,
        contact: formValue.mobile,
      },
      notes: {
        address: "note value",
      },
      theme: {
        color: "#F37254",
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
    if(this.data.subscription_details && this.data.subscription_details.length != 0){
      this.data.subscription_details.map((res)=>{
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
        this.dialogRef.close();
        localStorage.setItem('subscription_details',JSON.stringify(res.result.subscription_detail));
        this.router.navigateByUrl('/subscription-confirmation');
      }
      console.log('respose',res)
      this.ngxSpinner.hide();
    })     
  }


  // verify user is existing or not
  verify_user(){
    if(this.subscriptionForm.status == 'VALID'){
      this.ngxSpinner.show();
      const reqBody = this.paylode_reqBody();
      this.subscriptions.subscription_validation(subscription.PURCHASE_SUBSCRIPTION_VERIFY_USER,reqBody).subscribe((res:any)=>{
        if(res.result.res_status == 201){
          // this.otp_details.verify_otp =
           this.otp_details.show_otp  = this.otp_details.validate_otp = true
           
        }else if(res.result.res_status == 200){
          
          this.proceedToPay();
        }
        this.ngxSpinner.hide();
        res.result.res_status == 200 ? null : this.printToastMsg(res.result.msg)
        console.log(res)
      });
    }else{
      if(this.subscriptionForm.controls['email'].value == '' || this.subscriptionForm.controls['mobile'].value == '' || this.subscriptionForm.controls['name'].value == ''){
        console.log(this.subscriptionForm)
        this.printToastMsg('Please Fill The All Fields');
      }else{
        if(this.subscriptionForm.controls['email'].status == 'INVALID' && this.subscriptionForm.controls['mobile'].status != 'INVALID'){
          this.printToastMsg('Please Enter a Valid Email ID');
        }else if(this.subscriptionForm.controls['email'].status != 'INVALID' && this.subscriptionForm.controls['mobile'].status == 'INVALID'){
          this.printToastMsg('Please Enter a Valid Mobile Number');
        }else if(this.subscriptionForm.controls['email'].status == 'INVALID' && this.subscriptionForm.controls['mobile'].status == 'INVALID'){
          this.printToastMsg('Please Enter a Valid Mobile Number and Email ID');
        }else {
          this.printToastMsg('Please Enter a Valid Mobile Number and Email ID');
        }
        console.log(this.subscriptionForm)
      }
    }
  }


  

  // verify_otp
  otp_validate(){
    if(this.subscriptionForm.status == 'VALID' && this.subscriptionForm.controls['otp'].value != '' && this.subscriptionForm.controls['otp'].value.length == 4){
      const reqBody = this.paylode_reqBody();
      reqBody['otp'] = this.subscriptionForm.controls['otp'].value 
      this.subscriptions.subscription_validation(subscription.VERIFY_USER_NUMBER,reqBody).subscribe((res:any)=>{
        if(res.result.msg == 'OTP not match'){
          this.printToastMsg(res.result.msg);
        }else{
          this.proceedToPay();
        }
      });
    }else{
      this.printToastMsg(this.subscriptionForm.status == 'VALID' ? 'Please Enter OTP' : 'Please Fill The All Fields');
    }
  }


  paylode_reqBody(){
    let formValue = { ...this.subscriptionForm.value }
    const reqBody = {
      email : formValue.email,
      mobile : formValue.mobile,
      name : formValue.name,
      country_code : formValue.country_code,
    }
    return reqBody
  }


  printToastMsg(msg) {
    this.toast.open(msg, "X", {
      duration: 5000,
      verticalPosition: "top",
      panelClass: "custom-snackbar",
    });
  }

}


// "transaction_id":"pay_KS5hPAJJb3H04z",