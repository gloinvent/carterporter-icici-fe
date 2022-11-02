import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Options } from 'selenium-webdriver/opera';

@Injectable({
  providedIn: 'root'
})
export class TripsordersService {
  httpOptions: any;
  private readonly BASE_URL = environment.baseUrl;
  private readonly API_URL = this.BASE_URL;
  private HEADERS = new Headers({
    "Content-Type": "application/json",
     access_token: localStorage.getItem("access_token"),
  });

  constructor(private http: HttpClient) { }	
    setHeaders() {
	    this.httpOptions = {
	      headers: new Headers({
		    "Content-Type": "application/json",
		     access_token: localStorage.getItem("accessToken"),
		  })
	    }
	}

	setHeadersForPostaData() {
	   return this.httpOptions = {
	      headers: new Headers({
		    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		  })
	    }
	}

	setHeadersForForm() {
	    this.httpOptions = {
	      headers: new Headers({
		    "Content-Type": undefined,
		  })
	    }
	}

    getOrdersAndTrips(data, page){
	   	this.setHeadersForForm();
	  	return this.http.post(this.BASE_URL +'r=customer-api/customerorders&access_token='+ localStorage.getItem("accessToken") +'&page='+page, data, this.httpOptions)
	}

	getOrdersInvoicePdf(orderNumber){
	   	this.setHeadersForForm();
	  	return this.http.get(this.BASE_URL +'r=order/order-confrimation-pdf&order_number='+orderNumber, this.httpOptions)
	}

	payment(data) {
		let pay = JSON.stringify(data);
		this.setHeadersForPostaData();
        return this.http.post(this.BASE_URL +'r=order-api/paymentdetails&access_token=' +localStorage.getItem("accessToken"), pay, this.httpOptions);
    }

    cancelOrder(id){
    	this.setHeaders()
    	return this.http.post(this.BASE_URL +'r=order-api/cancel1&access_token=' +localStorage.getItem("accessToken"), id, this.httpOptions);
    	
    }

}
