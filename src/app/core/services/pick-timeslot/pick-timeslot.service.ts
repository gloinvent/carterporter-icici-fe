import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PickTimeslotService {

  loggedUser = false;
  public  headers = new Headers();

  constructor( private http: HttpClient ) {
    this.headers.append('content-type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Headers', '*');
   }

  baseurl = environment.baseUrl;

  getTimeslot(api) {
    return this.http.get(this.baseurl + api);
  }
}
