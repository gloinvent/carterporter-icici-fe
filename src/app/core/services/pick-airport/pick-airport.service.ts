import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Http, Headers, RequestOptions } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class PickAirportService {
  loggedUser = false;
  public headers = new Headers();

  constructor(private http: HttpClient) {
    this.headers.append("content-type", "application/json");
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Access-Control-Allow-Headers", "*");
  }

  baseurl = environment.baseUrl;

  getAirport(api) {
    return this.http.get(this.baseurl + api);
  }

  public getdistance(originpin, destinationpin) {
    const url =
      "https://carter-cors.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" +
      originpin +
      "&destinations=" +
      destinationpin +
      "&key=AIzaSyD9d0O6GwKmtXDbKtmWFIV2nhXrSmIOvik";
    return this.http.get(url).toPromise();
  }
  public getState(destinationpin) {
    // const url = "https://carter-cors.herokuapp.com/http://postalpincode.in/api/pincode/"+destinationpin
    const url =
      "https://carter-cors.herokuapp.com/https://api.worldpostallocations.com/pincode?postalcode=" +
      destinationpin +
      "&countrycode=IN";
    // const url = "https://carter-cors.herokuapp.com/https://thezipcodes.com/get-zip-data?zipCode="+destinationpin+"&countryCode=IN"
    return this.http.get(url).toPromise();
  }

  public getPincode(pincode):Observable<any> {
    const url= 'https://maps.googleapis.com/maps/api/geocode/json?address='+ pincode +'&sensor=true&key=AIzaSyBYZ8y8XMESY-rrKXVXahIbNmOTnvsuIhM'
    return this.http.get(url);
  }
}
