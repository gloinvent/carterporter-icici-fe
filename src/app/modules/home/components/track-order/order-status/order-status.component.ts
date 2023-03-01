import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MatStepper } from "@angular/material";

@Component({
  selector: "app-order-status",
  templateUrl: "./order-status.component.html",
  styleUrls: ["./order-status.component.scss"],
})
export class OrderStatusComponent implements OnInit {
  @Input() order: any = [];
  // @ViewChild("stepper", { static: false }) stepper: MatStepper;
  currentStep: any = 0;

  constructor() {}

  ngOnInit() {
    // this.order = JSON.parse(localStorage.getItem("order_detail"));
    window.scroll(0, 0);
  }
  onNoClick(): void {
    // this.dialogRef.close();
  }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     if (this.order.order_status.length != 0) {
  //       this.order.order_status.map((res, i) => {
  //         console.log(res);
  //         if (res.status == 1) {
  //           this.currentStep = i;
  //         }
  //       });
  //     }
  //   }, 100);
  // }

  getSelectedIndex(status) { 
    let currentStep
    if (status.length != 0) {
      status.map((res, i) => {
        if (res.status == 1) {
          currentStep = i;
        }
      });
      return currentStep
    }
    else{
      return false
    }
  }

  ngAfterViewInit(): void {
   setTimeout(()=>{
    let element:any = document.querySelectorAll('mat-step-header');
    if(element && element.length !=0){
      for(let i=0;i<=element.length-1;i++){
        if(document.querySelectorAll('mat-step-header')[i].getAttribute('ng-reflect-label') == 'Cancelled' || document.querySelectorAll('mat-step-header')[i].getAttribute('ng-reflect-label') == 'Cancelled with Refund' || document.querySelectorAll('mat-step-header')[i].getAttribute('ng-reflect-label') == 'Rescheduled'){
            document.querySelectorAll('mat-step-header')[i].querySelector('.mat-step-icon')['style'].background='red'
          }
      }
    }
   },200)
  }
  


  
}
