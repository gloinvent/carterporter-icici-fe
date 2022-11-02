import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {



  constructor(private http: HttpClient) {
  }


  // get Airline Detail
  get_airline_details(){

  }

  // this function is common api handler for below API ENDPOINTS
  // 1) validate subscription id
  // 2) validate subscription number
  // 3) otp validation
  // 4) resend code
  subscription_validation(api,data){
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json; charset=UTF-8",}),
    };
    return this.http.post("https://carter-cors.herokuapp.com/" + environment.baseUrl + api, data ,httpOptions);
  }

  get_subscription_details(api){
    return this.http.get(environment.baseUrl + api);
  }





}
