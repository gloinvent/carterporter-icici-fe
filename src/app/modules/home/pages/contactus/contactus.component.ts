import { Component, OnInit } from '@angular/core';
import { LuggageGuideComponent } from '../../../../shared/modals/luggage-guide/luggage-guide.component';
import { PickAirportService } from '../../../../core/services/pick-airport/pick-airport.service';
import { apis } from '../../../../config/apis';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material'
import { CrudService } from 'src/app/core/services/crud.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HomeCitywiseCostService } from '../../../../core/services/home-citywise-cost/home-citywise-cost.service';



@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  queryForm:FormGroup;
  airportdata: any;
  airportnames: any;
  city: any;
  toShort:any;


  constructor(private formBuilder: FormBuilder, private pickAirport: PickAirportService,private _snackbar: MatSnackBar,public crud: CrudService,private spinnerService: Ng4LoadingSpinnerService,public cityDetails: HomeCitywiseCostService,) { }

  ngOnInit() {
    this.getCost();
    this.queryForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      query: [''],
    });

    this.pickAirport.getAirport(apis.GET_CITY).subscribe(data => {
      this.airportdata = data;
      this.toShort = data;
      this.airportnames = this.airportdata.response.airport;
      this.city = this.airportdata.response.region;


      for(let i = 0; i<this.airportdata.response.airport.length; i++){
        for(let j = this.toShort.response.airport.length-1; j>=i; j--){
          if((this.airportdata.response.airport[i].airport_name == this.toShort.response.airport[j].airport_name)){
            this.airportdata.response.airport.pop()[j];
          }
        }
      }

      for(let i = 0; i<this.airportdata.response.airport.length; i++){
        if(this.airportdata.response.airport[i].airport_name_id == "3"){
          this.airportName = this.airportdata.response.airport[i].airport_name;
          this.airportDesc = this.airportdata.response.airport[i].description;
          if (this.airportDesc !== '') {
            this.airportDescShow = this.airportDesc.split('&');
            for (let a of this.airportDescShow) {
              this.airportContent = a.split(':');
              this.airportContentArray.push(this.airportContent);
            }
          } 
          else {
            this.airportDescShow = '';
          }
        }
      }
    });
  }

  avtiveTab:any = 'airport';
  setFlag(value){
    this.avtiveTab = value;
  } 

  airportDesc:any;
  airportDescShow:any;
  airportContent:any;
  airportContentArray:any = [];
  airportName:any;
  setState(description,airportName){
    this.airportContentArray = [];
    this.showDropdownList = false;
    this.airportName = airportName;
    this.airportDesc = description;
    if (this.airportDesc !== '') {
      this.airportDescShow = this.airportDesc.split('&');
      for (let a of this.airportDescShow) {
        this.airportContent = a.split(':');
        this.airportContentArray.push(this.airportContent);
      }
    } 
    else {
      this.airportDescShow = '';
    }
  }

  showDropdownList:boolean = false;
  showHideDropDownList(){
    this.showDropdownList = !this.showDropdownList;
  }



  submitQueryForm(){

    this.spinnerService.show();
    let obj = {
      "name":this.queryForm.value.name,
      "email":this.queryForm.value.email,
      "query":this.queryForm.value.query
    }

    this.crud.post(apis.CONTACTUS_QUERY, obj).subscribe(
      res => {
        this._snackbar.open('Your query submitted successful', 'X', {
          duration: 5000, verticalPosition: 'top', panelClass: 'custom-snackbar'
        });
        this.queryForm.reset();
        this.spinnerService.hide();
      },
      err => {
        this._snackbar.open('Something went wrong', 'X', {
          duration: 5000, verticalPosition: 'top', panelClass: 'custom-snackbar'
        });
        this.spinnerService.hide();
      }
    )
  }

  getInfoKey(key: string): string {
    return 1 + '-' + 1 + '-' + key;
  }


  city_details:any;
  city_list:any;
  getCost() {
    this.cityDetails.getCityWiseCostDetails().subscribe(data => {
        this.city_details = data;
        this.city_list = this.city_details.cityrate;
        console.log(this.city_list);
    });
  }

}
