import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeCitywiseCostService {

  constructor(public http: HttpClient) { }

  getCityWiseCostDetails() {
    return this.http.get('../../../assets/json/city-rate.json');
  }

  getContactUsCityDetails() {
    return this.http.get('../../../assets/json/contactus-city.json');
  }

  getLocateUs() {
    return this.http.get('../../../assets/json/locate-us.json');
  }

  getLocateUsMobile() {
    return this.http.get('../../../assets/json/locateus-mobile.json');
  }
}
