import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
// import { WindowRef } from 'windowRef.service';
@Injectable({
  providedIn: 'root'
})
export class RazorPayService {
	private readonly razaorPayKey = environment.razorPayKey;
  constructor() { }


    payWithRazor(){ 
      let options:any = {
          "key": this.razaorPayKey,
          "amount": 100,
          "name": "Company Name",
          "description": "dummy data",
          "image": "./assets/images/logo.png",
          "modal": {
            "escape": false
          }, 
          "prefill": {
            "name": 'mahendra',
            "contact": '8904067991',
            "email": 'mahendra.t@pacewisdom.com',
            "method": 'card',
            'card[number]': '4234234234234234',
            'card[expiry]': '33/22',
            'card[cvv]': '013'
          },
          "notes": {
            "address": "address"
          },
          "theme": {
            "color": "#6fbc29"
          }
        };
        options.handler = ((response) => {
            options['payment_response_id'] = response.razorpay_payment_id;
            // this.paymentService.payWithRazor({cart: finalObj, payment: options});
        });
        options.modal.ondismiss = (() => {
            // this.loginService.SetLoader = false;
        });
        // let rzp = new this.winRef.nativeWindow.Razorpay(options);
        // rzp.open();
    }
}
