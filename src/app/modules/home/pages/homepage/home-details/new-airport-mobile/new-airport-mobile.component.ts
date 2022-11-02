import { Component, OnInit, NgZone, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';
import { PickAirportService } from '../../../../../../core/services/pick-airport/pick-airport.service';
import { apis, CORPORATE_APIS } from '../../../../../../config/apis';
import { PickTimeslotService } from '../../../../../../core/services/pick-timeslot/pick-timeslot.service';
import { CrudService } from 'src/app/core/services/crud.service';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from "ngx-spinner";
import { UtilService } from 'src/app/core/services/util.service';
import { throttleTime } from "rxjs/operators";
import { Router } from "@angular/router";
import { PickStateService } from '../../../../../../core/services/pick-state/pick-state.service';
import { PassArrayService } from 'src/app/core/services/pass-array.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/shared/modals/login/login.component';

declare var Razorpay: any;


@Component({
  selector: 'app-new-airport-mobile',
  templateUrl: './new-airport-mobile.component.html',
  styleUrls: ['./new-airport-mobile.component.scss'],
  providers: [LoginComponent],
})
export class NewAirportMobileComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    private datePipe: DatePipe,
    private pickairport: PickAirportService,
    private picktimeslot: PickTimeslotService,
    private crud: CrudService,
    private _snackbar: MatSnackBar,
    private ngZone: NgZone,
    private razorPays: UtilService,
    private ngxSpinner: NgxSpinnerService,
    private router: Router,
    private pickstate: PickStateService,
    public dialog: MatDialog,
  ) { }

  bagJson: any = {
    "bags": [
      {
        'no_of_bags': 2,
        'arrival_token': '1e94681feadf26f1fa1cba2ed355e14d',
        'departure_token': '442e7a1ed12df02f9554f2682ab3cc67'
      },
      {
        'no_of_bags': 3,
        'arrival_token': '35fcdff9e7c0b0fad07d7f500ec25b07',
        'departure_token': '281acf413c27d996bdeaf43b9ea45845'
      },
      {
        'no_of_bags': 4,
        'arrival_token': 'd778f3f61cb8f1df5deaa2f3d7894eb7',
        'departure_token': '7e4b95c57ec67dda7519ff43e795eae9'
      },
      {
        'no_of_bags': 5,
        'arrival_token': '1ad98984de9bfdfca10f76257b1eb74f',
        'departure_token': '2b59017b3fab8a763381444420a98403'
      },
      {
        'no_of_bags': 6,
        'arrival_token': 'a14e0411d009f0156a6cbc8e7921e2d7',
        'departure_token': '3837748cc63e6fbddbc7fb5d8e329ea5'
      },
      {
        'no_of_bags': 7,
        'arrival_token': '38b3192165bef2a2082cd10e21a286c9',
        'departure_token': '4b71195e44ddafd61b8b3c6da3ee0a6a'
      },
      {
        'no_of_bags': 8,
        'arrival_token': '0d702c0a2d4be3ef33d90db2234cd946',
        'departure_token': '35072216690e65179a66b087ecd4ffb9'
      }
    ]
  }

  selected_pincode_array = [
    {
      city: 'Bangalore',
      city_id: 1,
      pincode: '560001'
    },
    {
      city: 'Hyderabad',
      city_id: 2,
      pincode: '500001'
    },
    {
      city: 'Mumbai & Navi Mumbai',
      city_id: 3,
      pincode: '400001'
    },
    {
      city: 'New Delhi & NCR',
      city_id: 5,
      pincode: '110001'
    },
  ]

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.showBagDropdown = false;
    this.showTimeSlotDropDown = false;
    this.showCityDropDown = false;
    this.showAirportDropDown = false;
    this.showCountryDropDown = false;
    // this.showMeet = false;
    this.showStateDropdown = false;
  }

  Currentdate: any;
  
  selected_date_for_date_picker: any;
  date = new Date();
  olaDataForm: FormGroup;

  delivery_date: any;
  CurrentTime = new Date().getHours();
  CurrentMin = new Date().getMinutes();

  terms_con_checkbox: boolean = false;

  service_type: any = 1;

  accessToken: any;
  getToken: any;

  userDetails: any;

  userName:any;
  userMobileNumber:any;
  userEmail:any;

  ngOnInit() {
    this.createOlaForm();
    this.callAllApis();
    this.razorPays.lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js').subscribe();
    this.token.currentToken.subscribe(gst => {
      this.getToken = gst;
      this.accessToken = localStorage.getItem('carterXAccessToken');
      this.userDetails = JSON.parse(localStorage.getItem('loginUserDetails'))
      this.userName = this.userDetails.customer_detail.name;
      this.userMobileNumber = this.userDetails.customer_detail.mobile;
      this.userEmail = this.userDetails.customer_detail.email;
    });

    console.log("this.ty",this.type_of_services);
  }

  // create ola form object
  createOlaForm() {
    this.olaDataForm = this.fb.group({
      date: [''],
      pincode: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern('[0-9]+')
      ]],
      city_id: [1, Validators.required],
      bags: ['2', Validators.required],
      airport_id: ['', Validators.required],
      time_slot: ['2', Validators.required],
      country: ['', Validators.required],
      state_id: [''],
      name:['', Validators.required],
      mobile_number: ['', Validators.required],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern(/\S+@\S+\.\S+/)
        ])
      ],
    });

    console.log("this.olaDataForm.value.date", this.olaDataForm.value.date);
  }

  // calling all data apis
  callAllApis() {
    this.pickCityFunction();
  }

  // city data
  cityData: any;
  cityNames: any;
  airportnames: any;
  countryCodeList: any;
  selectedCountry: any;
  showCountryDropDown: boolean = false;
  pickCityFunction() {
    this.pickairport.getAirport(apis.GET_CITY).subscribe(data => {
      this.cityData = data;
      this.cityNames = this.cityData.response.region;
      this.airportnames = this.cityData.response.airport
      for (let i of this.cityData.response.airport) {
        if (Number(i.fk_tbl_city_of_operation_region_id) === 1) {
          this.airports.push(i);
        }
      }
      this.changeTravelType(1);
      this.selectTypeofWay(2);
    });
    this.crud.get(apis.COUNTRY_CODES).subscribe((data: any) => {
      this.countryCodeList = data.codes;
      this.olaDataForm.controls['country'].setValue('91');
      this.selectedCountry = this.countryCodeList.find(
        c => c.country_code === "91"
      );
    });
  }

  showCuntryDropDown(event) {
    this.showCountryDropDown = !this.showCountryDropDown;
    event.stopPropagation()
  }

  //to get timeslots
  timeSlotData: any;
  timeSlotData1: any = [];
  pickTimeSlotFunction() {
    this.picktimeslot.getTimeslot(apis.TIME_SLOTS).subscribe(data => {
      this.timeSlotData = data;
      this.timeSlotData = this.timeSlotData.slots;

      this.filterTimeSlot();
    });
  }


  //get state list
  statedata: any;
  statenames: any;
  getState() {
    this.states_array = [];
    this.pickstate.getState(apis.GET_STATES_AND_RATES).subscribe(data => {
      this.statedata = data;
      this.statenames = this.statedata.response.state;
      console.log(this.statenames);
      for (let s of this.statenames) {
        if (s.city_id === Number(1) && Number(3) === s.airport_id) {
          this.states_array.push(s);
        }
      }
    });
  }

  //get is it local or outstation
  travel_type: any = 1;
  show_select_date_two: any;
  public startAt = new Date(2020, 10, 10, 10, 30, 30);
  changeTravelType(num) {
    this.selectBox = 1;
    this.travel_type = num;
    this.show_state = '';
    this.showAirport = '';
    this.airports = [];
    for (let i of this.airportnames) {
      if (Number(i.fk_tbl_city_of_operation_region_id) === 1) {
        this.airports.push(i);
      }
    }
    this.showCity = 'BANGALORE';
    this.show_time_slot = 'Select Time Slot';
    this.olaDataForm.controls['city_id'].setValue(1);
    this.olaDataForm.controls['airport_id'].setValue('');
    this.olaDataForm.controls['bags'].setValue(2);
    this.olaDataForm.controls['pincode'].setValue('');

    if(num === 1){
     this.olaDataForm.controls['pincode'].setValue('560001');
    }
    else{
     this.olaDataForm.controls['pincode'].setValue('');
    }
    this.approximateAmount = 0;
    this.terms_con_checkbox = false;
    this.delivery_date = '';
    this.afterBefore = '';
    this.show_delivery_time = "";
    this.showMeetDrop = false;
    // this.filterTimeSlot();
  }

  //GET know is it to-airport or from-airport
  type_of_services: any = 2;
  show_select_date_one: any;
  selectTypeofWay(num) {
    this.delivery_date = '';
    this.afterBefore = '';
    this.show_delivery_time = "";
    this.show_state = '';
    this.showAirport = '';
    this.airports = [];
    for (let i of this.airportnames) {
      if (Number(i.fk_tbl_city_of_operation_region_id) === 1) {
        this.airports.push(i);
      }
    }
    //set token
    if(num === 1)
    this.token = this.bagJson.bags[0].arrival_token
    else
    this.token = this.bagJson.bags[0].departure_token

    console.log(this.token);
    this.showCity = 'BANGALORE';
    this.olaDataForm.controls['city_id'].setValue(1);
    this.olaDataForm.controls['airport_id'].setValue('');
    this.show_time_slot = 'Select Time Slot';
    this.showMeetDrop = false;
    this.type_of_services = num;
    this.selectBox = 1;
    // this.filterTimeSlot();
    if (num === 1 && this.travel_type === 2) {
      this.Currentdate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 10, 33, 30, 0);
      this.selected_date_for_date_picker = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3, 10, 33, 30, 0);

      this.show_select_date_one = new Date(this.selected_date_for_date_picker);
      this.show_select_date_one = this.show_select_date_one.setDate(this.selected_date_for_date_picker.getDate() + 3);
      this.show_select_date_one = new Date(this.show_select_date_one);

      this.show_select_date_two = new Date(this.selected_date_for_date_picker);
      this.show_select_date_two = this.show_select_date_two.setDate(this.selected_date_for_date_picker.getDate() + 4);
      this.show_select_date_two = new Date(this.show_select_date_two);


      this.showDate = this.selected_date_for_date_picker.toString().split(' ');
      console.log("this.showDate", this.showDate);
      this.getState();
      this.pickTimeSlotFunction();
    }
    else if (num === 2 && this.travel_type === 2) {
      this.show_select_date_one = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 10, 33, 30, 0);
      this.show_select_date_two = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 10, 33, 30, 0);
      this.selected_date_for_date_picker = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 10, 33, 30, 0);
      this.showDate = this.selected_date_for_date_picker.toString().split(' ');
      this.Currentdate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1, 10, 33, 30, 0);
      this.getState();
      this.pickTimeSlotFunction();
    }
    else {
      this.Currentdate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1, 10, 33, 30, 0);
      this.selected_date_for_date_picker = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 10, 33, 30, 0);
      this.showDate = this.selected_date_for_date_picker.toString().split(' ');

      this.show_select_date_one = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 10, 33, 30, 0);

      this.show_select_date_two = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 10, 33, 30, 0);
      console.log("this.showDate", this.showDate);
      this.pickTimeSlotFunction();
    }
  }

  showBagDropdown: boolean = false;
  selectBagDropdown(event) {
    this.showBagDropdown = !this.showBagDropdown;
    event.stopPropagation()
    this.showTimeSlotDropDown = false;
    this.showCityDropDown = false;
    this.showAirportDropDown = false;
    this.showCountryDropDown = false;
    this.showMeet = false;
    this.showStateDropdown = false;
  }

  getInsurance: any = 8;
  
  token:any;
  selectBag(item) {
    console.log("item,item", item);
    this.showBagDropdown = false;

    //set token
    if(this.type_of_services === 1)
    this.token = item.arrival_token
    else
    this.token = item.departure_token

    this.olaDataForm.controls['bags'].setValue(item.no_of_bags);
    this.approximateAmount = 0;
    this.getInsurance = item.no_of_bags * 4;
    this.getApproximateAmount();
  }


  showDate: any;
  onChange() {
    this.delivery_date = '';
    this.afterBefore = '';
    this.show_delivery_time = '';
    this.showDate = this.selected_date_for_date_picker.toString().split(' ');
    this.showTimeSlotDropDown
    this.timeSlotData1 = [];
    this.show_time_slot = 'Select Time Slot';
    this.filterTimeSlot();

    if (this.type_of_services === 2 && this.travel_type === 2) {
      this.show_select_date_one = new Date(this.selected_date_for_date_picker);
      this.show_select_date_one = this.show_select_date_one.setDate(this.selected_date_for_date_picker.getDate());
      this.show_select_date_one = new Date(this.show_select_date_one);

      console.log("this.show_select_date_one", this.show_select_date_one)

      this.show_select_date_two = new Date(this.selected_date_for_date_picker);
      this.show_select_date_two = this.show_select_date_two.setDate(this.selected_date_for_date_picker.getDate() + 1);
      this.show_select_date_two = new Date(this.show_select_date_two);

      console.log("this.show_select_date_two", this.show_select_date_two)
    }
    else if (this.type_of_services === 1 && this.travel_type === 2) {
      this.show_select_date_one = new Date(this.selected_date_for_date_picker);
      this.show_select_date_one = this.show_select_date_one.setDate(this.selected_date_for_date_picker.getDate() + 3);
      this.show_select_date_one = new Date(this.show_select_date_one);


      this.show_select_date_two = new Date(this.selected_date_for_date_picker);
      this.show_select_date_two = this.show_select_date_two.setDate(this.selected_date_for_date_picker.getDate() + 4);
      this.show_select_date_two = new Date(this.show_select_date_two);
    }
    else {
      this.show_select_date_two = new Date(this.selected_date_for_date_picker);
      this.show_select_date_one = new Date(this.selected_date_for_date_picker);
      this.show_select_date_two = this.show_select_date_two.setDate(this.selected_date_for_date_picker.getDate() + 1);

      this.show_select_date_two = new Date(this.show_select_date_two);
    }
    console.log("this.show_select_date_two", this.show_select_date_two);
    console.log("this.selected_date_for_date_picker", this.show_select_date_one);
    this.showMeetDrop = false;
  }

  showCityDropDown: boolean = false;
  selectCityDropdown(event) {
    this.showCityDropDown = !this.showCityDropDown;
    this.showAirportDropDown=false;
    event.stopPropagation();
    this.showMeet = false;
    this.showBagDropdown = false;
    this.showTimeSlotDropDown = false;
    this.showAirportDropDown = false;
    this.showCountryDropDown = false;
    this.showStateDropdown = false;
  }

  showCity: any;
  airports: any = [];
  showAirport: any = '';
  selectcity(city) {
    console.log(city);
    this.states_array = [];
    this.airports = [];

    this.showCityDropDown = !this.showCityDropDown;
    
    if(this.travel_type == 1){
      this.olaDataForm.controls['city_id'].setValue(city.city_id);
      this.olaDataForm.get('pincode').setValue(city.pincode);
      this.showCity = city.city;
      console.log(this.airportnames);
      for (let i of this.airportnames) {
        console.log(i.fk_tbl_city_of_operation_region_id,city.city_id);
        if (Number(i.fk_tbl_city_of_operation_region_id) === city.city_id) {
          this.airports.push(i);
        }
      }
    }
    else{
      this.olaDataForm.controls['city_id'].setValue(city.region_id);
      this.olaDataForm.get('pincode').setValue('');
      this.showCity = city.region_name;
      console.log(this.airportnames);
      this.show_state = '';
      console.log(this.airportnames);
      for (let i of this.airportnames) {
        if (Number(i.fk_tbl_city_of_operation_region_id) === city.region_id) {
          this.airports.push(i);
        }
      }
    }
    
    
    this.olaDataForm.get('state_id').setValue('');
    this.approximateAmount = 0;
    this.showAirport = '';
    this.olaDataForm.controls['airport_id'].setValue('');
  }

  showAirportDropDown: boolean = false;
  selectAirportDropdown(event) {
    this.showAirportDropDown = !this.showAirportDropDown;
    this.showCityDropDown=false;
    event.stopPropagation()
    this.showMeet = false;
    this.showBagDropdown = false;
    this.showTimeSlotDropDown = false;
    this.showCityDropDown = false;
    this.showCountryDropDown = false;
    this.showStateDropdown = false;
  }

  showTimeSlotDropDown: boolean = false;
  selectTimeSLotDropdown(event) {
    this.showTimeSlotDropDown = !this.showTimeSlotDropDown;
    event.stopPropagation();
    this.showMeet = false;
    this.showBagDropdown = false;
    this.showCityDropDown = false;
    this.showCountryDropDown = false;
    this.showStateDropdown = false;
    this.showAirportDropDown =false;
  }

  //to filter time slot 
  filtered_tilme_slot: any = [];
  filterTimeSlot() {
    console.log(this.olaDataForm.value.date);
    this.filtered_tilme_slot = [];
    let selectedDate = this.datePipe.transform(this.olaDataForm.value.date, 'dd MMM y');
    let todayDate = this.datePipe.transform(new Date(), 'dd MMM y');
    if (this.type_of_services === 1) {
      if (todayDate === selectedDate) {
        for (const i of this.timeSlotData) {
          let endHour;
          let endMin;
          let endH;
          let str = i.slot_start_time.slice(0, 2);
          let strMin = i.slot_start_time.slice(3, 5);
          endHour = Number(str) - 1;
          endH = Number(str) - 2;
          endMin = Number(strMin) + 30;
          if (i.slot_type === 0) {
            if (this.CurrentTime < endHour) {
              if (this.CurrentTime === endH && this.CurrentMin > endMin) {

              } else {
                this.filtered_tilme_slot.push(i);
              }
            }
          }
        }
      }
      else {
        for (const i of this.timeSlotData) {
          if (i.slot_type === 0) {
            this.filtered_tilme_slot.push(i);
          }
        }
        console.log(this.filtered_tilme_slot, "filtered_tilme_slot")
      }

    }
    if (this.type_of_services === 2) {
      if (todayDate === selectedDate) {
        for (const j of this.timeSlotData) {
          let str = j.slot_end_time.slice(0, 2);
          if (j.id_slots === 5) {
            str = Number(str) + 24;
            str = Number(str);
          }
          if (this.CurrentTime < str) {
            if (j.slot_type === 1 && (j.id_slots === 4 || j.id_slots === 5)) {
              this.filtered_tilme_slot.push(j);
            }
          }
        }
      } else {
        for (const j of this.timeSlotData) {
          if (j.slot_type === 1 && (j.id_slots === 4 || j.id_slots === 5)) {
            this.filtered_tilme_slot.push(j);
          }
        }
      }
    }
  }

  show_time_slot: any = 'Select Time Slot';
  show_delivery_time: any;
  show_delivery: boolean = false;
  slot_dropdown_vlidation: boolean = false;
  timeOnwards: any;
  nextDate: any;
  showSelectedDate: any;
  showMeetDrop: boolean = false
  afterBefore: any;
  selectTimeSlot(value) {
    this.delivery_date = ' ';
    this.show_time_slot = value.time_description;
    this.olaDataForm.controls['time_slot'].setValue(value.id_slots);
    console.log("value", value);
    this.slot_dropdown_vlidation = false;

    let time = value.time_description;
    let times = value.slot_end_time;
    let ampm = time.slice(10, 13);
    let timenumber = times.slice(0, 2);
    this.showSelectedDate = this.olaDataForm.value.date;
    // if(this.checkForOrderType === 1){
    if ((this.travel_type === 1 && this.type_of_services === 1)) {
      this.nextDate = null;
      if (value.id_slots === 5) {
        this.timeOnwards = 14;
        this.timeOnwards = Number(this.timeOnwards);
        this.afterBefore = 'Before';
        this.show_delivery_time = this.timeOnwards + ':00'
      } else if (value.id_slots === 7) {
        this.timeOnwards = 2;
        this.timeOnwards = Number(this.timeOnwards);
        this.show_select_date_one = new Date(this.selected_date_for_date_picker);
        this.show_select_date_one = this.show_select_date_one.setDate(this.selected_date_for_date_picker.getDate() + 1);
        this.show_select_date_one = new Date(this.show_select_date_one);
        this.show_select_date_two = new Date(this.selected_date_for_date_picker);
        this.show_select_date_two = this.show_select_date_two.setDate(this.selected_date_for_date_picker.getDate() + 2);
        this.show_select_date_two = new Date(this.show_select_date_two);
        this.delivery_date = new Date(this.selected_date_for_date_picker);
        this.delivery_date = this.delivery_date.setDate(this.selected_date_for_date_picker.getDate() + 1);
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = this.timeOnwards + ':00'
        this.afterBefore = 'After';
      } else if (value.id_slots === 9) {
        this.timeOnwards = 10;
        this.timeOnwards = Number(this.timeOnwards);
        this.delivery_date = new Date(this.selected_date_for_date_picker);
        this.delivery_date = this.delivery_date.setDate(this.selected_date_for_date_picker.getDate());
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = this.timeOnwards + ':00'
        this.afterBefore = 'After';
      }
      else {
        this.timeOnwards = Number(timenumber);
        this.timeOnwards = this.timeOnwards + 2;
        this.timeOnwards = Number(this.timeOnwards);
        this.delivery_date = this.selected_date_for_date_picker
        this.afterBefore = 'After';
        this.show_delivery_time = this.timeOnwards + ':00'
      }
    }
    if ((this.travel_type === 1 && this.type_of_services === 2)) {
      this.nextDate = null;
      if (value.id_slots === 5) {
        this.timeOnwards = 15
        this.timeOnwards = Number(this.timeOnwards);
        this.delivery_date = new Date(this.selected_date_for_date_picker);
        this.delivery_date = this.delivery_date.setDate(this.selected_date_for_date_picker.getDate() + 1);
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = 14 + ":00";
        console.log(" this.delivery_date", this.delivery_date);
        this.afterBefore = 'Before';
      }
      else {
        this.show_delivery_time = 23 + ":55"
        this.timeOnwards = 15
        this.timeOnwards = Number(this.timeOnwards);
        this.delivery_date = this.selected_date_for_date_picker;
        this.afterBefore = 'Before';
      }
    }
    if ((this.travel_type === 2 && this.type_of_services === 2)) {
      this.nextDate = null;
      if (value.id_slots === 5) {
        this.timeOnwards = 15
        this.timeOnwards = Number(this.timeOnwards);
        this.delivery_date = new Date(this.selected_date_for_date_picker);
        this.delivery_date = this.delivery_date.setDate(this.selected_date_for_date_picker.getDate() + 3);
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = 14 + ":00";
        this.afterBefore = 'Before';
      }
      else {
        this.timeOnwards = Number(timenumber);
        this.timeOnwards = 15
        this.timeOnwards = Number(this.timeOnwards);
        this.delivery_date = new Date(this.selected_date_for_date_picker);
        this.delivery_date = this.delivery_date.setDate(this.selected_date_for_date_picker.getDate() + 3);
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = 23 + ":55";
        this.afterBefore = 'Before';
      }
    }
    if (this.travel_type === 2 && this.type_of_services === 1) {
      this.nextDate = null;
      if (value.id_slots === 5) {
        this.timeOnwards = 14;
        this.delivery_date = new Date(this.selected_date_for_date_picker);
        this.delivery_date = this.delivery_date.setDate(this.selected_date_for_date_picker.getDate() + 3);
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = this.timeOnwards + ':00'
        this.afterBefore = 'After';
      } else if (value.id_slots === 7) {
        this.timeOnwards = 2
        this.timeOnwards = Number(this.timeOnwards);
        this.delivery_date = new Date(this.selected_date_for_date_picker);
        this.delivery_date = this.delivery_date.setDate(this.selected_date_for_date_picker.getDate() + 3);
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = this.timeOnwards + ':00'
        this.afterBefore = 'After';
      } else if (value.id_slots === 9) {
        this.timeOnwards = 10
        this.timeOnwards = Number(this.timeOnwards);
        this.delivery_date = new Date(this.selected_date_for_date_picker);
        this.delivery_date = this.delivery_date.setDate(this.selected_date_for_date_picker.getDate() + 3);
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = '10:00'
        this.afterBefore = 'After';
      }
      else {
        this.timeOnwards = Number(timenumber);
        this.timeOnwards = this.timeOnwards + 2
        this.timeOnwards = Number(this.timeOnwards);
        this.delivery_date = new Date(this.selected_date_for_date_picker);
        this.delivery_date = this.delivery_date.setDate(this.selected_date_for_date_picker.getDate() + 3);
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = this.timeOnwards + ':00'
        this.afterBefore = 'After';
      }
    }
    this.showTimeSlotDropDown = false;
    this.meetHour = this.timeOnwards;
    this.meetMin = 0;
    this.show_delivery = true;
    console.log(this.delivery_date);
    this.showMeetDrop = true;
    this.selectBox = 1;
  }

  states_array: any = [];
  selectAirport(value) {
    this.states_array = [];
    this.showAirportDropDown = !this.showAirportDropDown;
    this.showAirport = value.airport_name;
    this.olaDataForm.controls['airport_id'].setValue(value.airport_name_id);
    if(this.travel_type === 1){
      this.getApproximateAmount();
    }
    else{
      for (let s of this.statenames) {
        if (s.city_id === Number(value.fk_tbl_city_of_operation_region_id) && Number(value.airport_name_id) === s.airport_id) {
          this.states_array.push(s);
        }
      }
      this.olaDataForm.get('pincode').setValue('');
    }
    this.show_state = '';
    this.olaDataForm.controls['state_id'].setValue('');
    this.approximateAmount = 0;
    console.log(this.states_array);
  }

  show_state: any = '';
  selectState(value) {
    this.olaDataForm.controls['state_id'].setValue(value.idState);
    this.olaDataForm.get('pincode').setValue('');
    this.approximateAmount = 0;
    this.show_state = value.stateName;
    this.showStateDropdown = !this.showStateDropdown;
  }

  showStateDropdown: any;
  selectStateDropdown(event) {
    this.showStateDropdown = !this.showStateDropdown;
    event.stopPropagation()
    this.showMeet = false;
    this.showBagDropdown = false;
    this.showTimeSlotDropDown = false;
    this.showCityDropDown = false;
    this.showAirportDropDown = false;
    this.showCountryDropDown = false;
  }

  // Validate Pincode
  pinRes: any;
  postPincode: any;
  pincode_error_msg: any;
  local_pincode_box: boolean;
  outstation_pincode_box: boolean;
  getPinCode() {
    this.approximateAmount = 0;
    let a = this;
    if (this.travel_type === 1) {
      if (this.olaDataForm.value.pincode.toString().length === 6) {
        let postPincode = [{
          "pincode": this.olaDataForm.value.pincode,
          "service_type": this.service_type,
          "airport_name_id": this.olaDataForm.value.airport_id,
          "city_id": ''
        }];

        this.crud.post(apis.PINCODE_AVAILABILITY, postPincode).subscribe(
          res => {
            this.pinRes = res;
            console.log(this.pinRes.status);
            if (this.pinRes.status === true) {
              document.getElementById("pincode").style.border = '1px solid #c7c7c7';
              this.getApproximateAmount();
              this.isPincodeValid = false;
            }
            if (this.pinRes.status === false) {
              this.pincode_error_msg = this.pinRes.message;
              this.local_pincode_box = true;
              setTimeout(function () { a.local_pincode_box = false }, 5000);
              this.olaDataForm.get('pincode').setValue('');
              this.isPincodeValid = true;
            }
          });
      }
      else if (this.olaDataForm.value.pincode.toString().length > 6) {
        this.olaDataForm.get('pincode').setValue('');
        this.isPincodeValid = true;
      }
      else {
        document.getElementById("pincode").style.border = '1px solid #fe7801';
        this.isPincodeValid = true;
      }
    }
    else {
      if (this.olaDataForm.value.pincode.toString().length === 6) {
        this.postPincode = {
          'state': this.show_state,
          'pincode': JSON.stringify(this.olaDataForm.value.pincode),
        };

        this.crud.post(apis.GET_STATE_PINCODE, this.postPincode).subscribe(
          res => {
            this.pinRes = res;
            console.log(this.pinRes.status);
            if (this.pinRes.state_status === true) {
              document.getElementById("pincode").style.border = '1px solid #c7c7c7';
              this.getApproximateAmount();
              this.isPincodeValid = false;
            }
            if (this.pinRes.state_status === false) {
              this.pincode_error_msg = this.pinRes.state_message;
              this.outstation_pincode_box = true;
              setTimeout(function () { a.outstation_pincode_box = false }, 5000);
              this.olaDataForm.get('pincode').setValue('');
              this.isPincodeValid = true;
            }
          });
      }
      else if (this.olaDataForm.value.pincode.toString().length > 6) {
        this.olaDataForm.get('pincode').setValue('');
        this.isPincodeValid = true;
      }
      else {
        document.getElementById("pincode").style.border = '1px solid #fe7801';
        this.isPincodeValid = true;
      }
    }
  }

  obj: any;
  approxAmount: any;
  approximateAmount: any = 0;
  loading: boolean = false;
  priceDetailsRes: any;
  luggage_itemsForCount: any = [];
  final_luggage_array: any = [];
  getApproximateAmount() {
    this.loading = true;
    this.approximateAmount = 0;
    const formValue = { ...this.olaDataForm.value };

    let amount = 0;
    const reqBody = {
      order_type: 3,
      transfer_type: 2,
      airport_name: formValue.airport_id,
      city_name: formValue.city_id,
      state_name: 0,
      excess_weight_purchased: "no",
      excess_weight: 0,
      bag_weight: 0,
      no_of_units: formValue.bags,
      pincode: formValue.pincode,
      service_type: this.type_of_services
    };
    this.crud
      .postWithCorporateToken(
        CORPORATE_APIS.GET_APPROX_AMOUNT,
        reqBody,
        this.token
      )
      .pipe(throttleTime(250))
      .subscribe(
        (data: any) => {
          this.priceDetailsRes = data;
          amount = Math.round(data.price_details.price_with_gst);
          this.approximateAmount = amount;
          // this.isMultiCheckBox == true ? this.getAmountForMultiplePincode() : '';
          this.loading = false;
        },
        () => (this.loading = false)
      );
  }

  isPincodeValid: boolean = false;
  //on click terms & con. checkbox
  changeTermandCon() {
    this.terms_con_checkbox = !this.terms_con_checkbox;
    // this.olaDataForm.value.time_slot === '' ? this.slot_dropdown_vlidation = true : this.slot_dropdown_vlidation = false;

    if (this.olaDataForm.controls['name'].invalid) {
      document.getElementById("name").style.border = '1px solid #fe7801';
    }

    if (this.olaDataForm.controls['mobile'].invalid) {
      document.getElementById("mobile").style.border = '1px solid #fe7801';
      document.getElementById("mobile_drop").style.border = '1px solid #fe7801';
    }

    if (this.olaDataForm.controls['email'].invalid) {
      document.getElementById("email").style.border = '1px solid #fe7801';
    }

    if (this.olaDataForm.controls['pincode'].invalid) {
      document.getElementById("pincode").style.border = '1px solid #fe7801';
    }
  }

  proceedToPay() {
    const formValue = { ...this.olaDataForm.value };
    let options = {
      key: "rzp_live_LthnWTU5SuA0Hg",
      // key: "rzp_test_fOTZDy0HmQGnS7",

      amount: Number(this.approximateAmount) * 100,
      currency: "INR",
      name: "CarterPorter",
      description: "Payment towards Carter",
      image: "https://cdn.razorpay.com/logos/Du4P7LfElD9azm_medium.jpg",

      handler: response => {
        this.ngZone.run(() => this.placeOrder());
      },
      prefill: {
        name: formValue.name,
        email: formValue.email,
        contact: formValue.mobile_number
      },
      notes: {
        address: "note value"
      },
      theme: {
        color: "#F37254"
      }
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
  }

  bookingData: any;
  placeOrder() {
    const priceDetails = this.priceDetailsRes;
    const itemsOrder = [];
    const bagItems =  priceDetails.price_details.items;
    debugger
    for (const key in bagItems) {
      if (bagItems.hasOwnProperty(key)) {
        const element = bagItems[key];
        itemsOrder.push({
          bag_type: key,
          price: element
        });
      }
    }
    this.ngxSpinner.show();
    const formValue = { ...this.olaDataForm.value };
    const reqBody = {
      order_type: 3,
      transfer_type: 2,
      airport_name: formValue.airport_id,
      corporate_type: 4,
      city_name: formValue.city_id,
      state_name: 0,
      excess_weight_purchased: "no",
      excess_weight: 0,
      bag_weight: 0,
      no_of_units: 1,
      email: formValue.email,
      pincode: formValue.pincode,
      items_order: itemsOrder,
      gst_amount: priceDetails.price_details.gst_price,
      luggage_price: priceDetails.price_details.total_luggage_price,
      // priceDetails.price_details.price_with_gst
      total_luggage_price: this.approximateAmount,
      outstation_charge: 0,
      excess_bag_amount: 0,
      service_type: this.type_of_services, // 1 for arrival, //2 for departure
      pickup_slot: 1,
      travell_passenger_name: formValue.name,
      travell_passenger_contact: formValue.mobile_number,
      pick_drop_spots_type: 1,
      building_restriction: {
        "0": 5
      },
      order_date: formValue.date,
      country_code: formValue.country,
      flight_number: formValue.pnr
    };
    this.crud
      .postWithStaticToken(
        CORPORATE_APIS.BOOKING, reqBody, this.token

      )
      .pipe(throttleTime(250))
      .subscribe(
        (data: any) => {
          if (data.status) {
            localStorage.setItem('order', data.order_number);
            localStorage.setItem('toOrfrom', this.type_of_services);
            this.ngxSpinner.hide()
            this.router.navigate(["/booking-confirmation-page"])
          }
        },
        () => this.ngxSpinner.hide()
      );
  }

  showCrn: boolean = false;
  getcrn() {
    if (this.olaDataForm.value.crn_number.toString().length < 10) {
      (<HTMLInputElement>document.getElementById("crn_number")).style.border = '1px solid orange';
      this.showCrn = true;
    }
    else {
      (<HTMLInputElement>document.getElementById("crn_number")).style.border = '1px solid rgb(199, 199, 199)';
      this.showCrn = false;
    }
    if (this.olaDataForm.value.crn_number == '') {
      (<HTMLInputElement>document.getElementById("crn_number")).style.border = '1px solid rgb(199, 199, 199)';
      this.showCrn = false;
    }
  }

  //validate name
  notValidName:boolean = false;
  getname() {
    if (this.olaDataForm.controls['name'].valid) {
      document.getElementById("name").style.border = '1px solid #c7c7c7';
      this.terms_con_checkbox = false;
    }
  }

  //validate mobile
  notValidMobile:boolean = false;
  getMobile() {
    if (this.olaDataForm.controls['mobile_number'].valid) {
      document.getElementById("mobile").style.border = '1px solid #c7c7c7';
      document.getElementById("mobile_drop").style.border = '1px solid #c7c7c7';
    }
    else{
      this.notValidMobile = true;
    }
  }

  //validate email
  notValidEmail:boolean = false
  getEmail() {
    if (this.olaDataForm.controls['email'].valid) {
      document.getElementById("email").style.border = '1px solid #c7c7c7';
      this.notValidEmail = false;
    }
    else{
      this.notValidEmail = true;
    }
  }


  click() {
    if (window.pageYOffset > 200) {
      scrollTo(0, 201);
    }
  }

  meet_hour_error_box: boolean = false;
  meet_time_error_msg: any = '';
  //
  meetHour: any = 0;
  increaseMeetHour() {
    let a = this;
    this.showMeet = true;
    if (this.meetHour >= 23) {
      this.meetHour = this.timeOnwards;
    }
    else {
      this.meetHour += 1;
    }
    if (this.travel_type === 1 && this.type_of_services === 2) {
      if (this.meetHour > 15) {
        this.delivery_date = new Date(this.delivery_date);
        this.delivery_date = this.delivery_date.setDate(this.selected_date_for_date_picker.getDate() + 1);
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = '14:00';
      }
    }

    if (this.travel_type === 2 && this.type_of_services === 2) {
      if (this.meetHour > 15 && this.meetHour === 16) {
        this.delivery_date = new Date(this.delivery_date);
        console.log("this.delivery_date", this.delivery_date)
        this.delivery_date = this.delivery_date.setDate(this.selected_date_for_date_picker.getDate() + 4)
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = this.olaDataForm.value.time_slot === 4 ? '14:00' : '14:00';
      }
    }


    if (this.type_of_services === 1) {
      if (this.selectBox === 2) {
        if (this.meetHour > 13 && this.olaDataForm.value.time_slot === 1) {
          this.meetHour = this.timeOnwards;
          this.meet_hour_error_box = true;
          this.meet_time_error_msg = 'Time cannot be greater than 13:00';
          setTimeout(function () { a.meet_hour_error_box = false }, 5000);
        }
        else if (this.meetHour > 17 && this.olaDataForm.value.time_slot === 2) {
          this.meetHour = this.timeOnwards;
          this.meet_hour_error_box = true;
          this.meet_time_error_msg = 'Time cannot be greater than 17:00';
          setTimeout(function () { a.meet_hour_error_box = false }, 5000);
        }
        else if (this.meetHour > 21 && this.olaDataForm.value.time_slot === 3) {
          this.meetHour = this.timeOnwards;
          this.meet_hour_error_box = true;
          this.meet_time_error_msg = 'Time cannot be greater than 21:00';
          setTimeout(function () { a.meet_hour_error_box = false }, 5000);
        }
        else if (this.meetHour > 2 && this.olaDataForm.value.time_slot === 7) {
          this.meetHour = this.timeOnwards;
          this.meet_hour_error_box = true;
          this.meet_time_error_msg = 'Time cannot be greater than 2:00';
          setTimeout(function () { a.meet_hour_error_box = false }, 5000);
        }
      }
    }

    if (this.type_of_services === 2) {
      if (this.selectBox === 1) {
        if (this.olaDataForm.value.time_slot === 1 && this.meetHour > 15) {
          this.meetHour = this.timeOnwards;
          this.meet_hour_error_box = true;
          this.meet_time_error_msg = 'Time cannot be greater than 13:00';
          setTimeout(function () { a.meet_hour_error_box = false }, 5000);
        }
      }
    }
    console.log(this.delivery_date)
  }

  decreaseMeetHour() {
    let a = this;

    console.log("this.meetHour",this.meetHour);
    console.log("this.timeOnwards",this.timeOnwards);

    if (this.selectBox === 1) {
      if ((this.meetHour <= this.timeOnwards) && this.type_of_services !== 2) {
        this.meetHour = this.timeOnwards;
      }
      else if (this.type_of_services !== 2) {
        this.meetHour -= 1;
      }
      if (this.type_of_services === 2 && this.meetHour > 0) {
        this.meetHour -= 1;
      }
    }
    else if (this.selectBox === 2) {
      if ((this.meetHour <= this.timeOnwards) && this.type_of_services !== 2 && this.meetHour > 0) {
        this.meetHour -= 1;
      }
      else if (this.type_of_services !== 2 && this.meetHour == 0) {
        this.meetHour = this.timeOnwards;
      }
      else if (this.type_of_services === 2) {
        if(this.meetHour === 0){
          this.meetHour = 23;
        }
        else{
          this.meetHour -= 1;
        }
      }
    }

    if (this.travel_type === 1 && this.type_of_services === 2) {
      if (this.meetHour <= 15) {
        this.delivery_date = new Date(this.delivery_date);
        this.delivery_date = this.delivery_date.setDate(this.selected_date_for_date_picker.getDate());
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = this.olaDataForm.value.time_slot === 4 ? '23:55' : '14:00';
      }
    }

    if (this.travel_type === 2 && this.type_of_services === 2) {
      if (this.meetHour === 15) {
        this.delivery_date = new Date(this.delivery_date);
        console.log("this.delivery_date", this.delivery_date)
        this.delivery_date = this.delivery_date.setDate(this.selected_date_for_date_picker.getDate() + 3);
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = '23:55';
      }
    }
    else if (this.type_of_services === 1) {
      if (this.olaDataForm.value.time_slot === 1 && this.selectBox === 1 && this.meetHour <= this.timeOnwards) {
        this.meetHour = this.timeOnwards;
        this.meet_hour_error_box = true;
        this.meet_time_error_msg = 'Time cannot be less than 13:00';
      }
      else if (this.olaDataForm.value.time_slot === 1 && this.selectBox === 2 && this.meetHour > this.timeOnwards) {
        this.meetHour = this.timeOnwards;
        this.meet_hour_error_box = true;
        this.meet_time_error_msg = 'Time cannot be greater than 13:00';
      }
      else if (this.olaDataForm.value.time_slot === 2 && this.selectBox === 1 && this.meetHour <= this.timeOnwards) {
        this.meetHour = this.timeOnwards;
        this.meet_hour_error_box = true;
        this.meet_time_error_msg = 'Time cannot be less than 17:00';
      }
      else if (this.olaDataForm.value.time_slot === 2 && this.selectBox === 2 && this.meetHour >= this.timeOnwards) {
        this.meetHour = this.timeOnwards;
        this.meet_hour_error_box = true;
        this.meet_time_error_msg = 'Time cannot be greater than 17:00';
      }
      else if (this.olaDataForm.value.time_slot === 3 && this.selectBox === 1 && this.meetHour <= this.timeOnwards) {
        this.meetHour = this.timeOnwards;
        this.meet_hour_error_box = true;
        this.meet_time_error_msg = 'Time cannot be less than 21:00';
      }
      else if (this.olaDataForm.value.time_slot === 3 && this.selectBox === 2 && this.meetHour >= this.timeOnwards) {
        this.meetHour = this.timeOnwards;
        this.meet_hour_error_box = true;
        this.meet_time_error_msg = 'Time cannot be greater than 21:00';
      }
      else if (this.olaDataForm.value.time_slot === 7 && this.selectBox === 1 && this.meetHour <= this.timeOnwards) {
        this.meetHour = this.timeOnwards;
        this.meet_hour_error_box = true;
        this.meet_time_error_msg = 'Time cannot be less than 2:00';
      }
      else if (this.olaDataForm.value.time_slot === 7 && this.selectBox === 2 && this.meetHour >= this.timeOnwards) {
        this.meetHour = this.timeOnwards;
        this.meet_hour_error_box = true;
        this.meet_time_error_msg = 'Time cannot be greater than 2:00';
      }
      else if (this.olaDataForm.value.time_slot === 9 && this.selectBox === 1 && this.meetHour <= this.timeOnwards) {
        this.meetHour = this.timeOnwards;
        this.meet_hour_error_box = true;
        this.meet_time_error_msg = 'Time cannot be less than 10:00';
      }
      else if (this.olaDataForm.value.time_slot === 9 && this.selectBox === 2 && this.meetHour >= this.timeOnwards) {
        this.meetHour = this.timeOnwards;
        this.meet_hour_error_box = true;
        this.meet_time_error_msg = 'Time cannot be greater than 10:00';
      }
      setTimeout(function () { a.meet_hour_error_box = false }, 5000);
    }

    // if (this.travel_type === 2 && this.type_of_services === 2) {
    //   if (this.meetHour === 15) {
    //     this.delivery_date = new Date(this.delivery_date);
    //     this.delivery_date = this.delivery_date.setDate(this.delivery_date.getDate() - 1);
    //     this.delivery_date = new Date(this.delivery_date);
    //     this.show_delivery_time = '23:55';
    //     console.log(this.delivery_date)
    //   }
    // }
  }

  //
  meetMin: any = 0;
  increaseMeetMin() {
    if (this.meetMin < 59) {
      this.meetMin += 1;
    }
    else {
      this.meetMin = 0;
    }
  }

  decreaseMeetMin() {
    if (this.meetMin <= 59) {
      this.meetMin = 0;
    }
    else {
      this.meetMin -= 1;
    }
  }

  //
  // meetAmPm: boolean = 

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '320px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.token.currentToken.subscribe(gst => {
        this.getToken = gst;
        this.accessToken = localStorage.getItem('carterXAccessToken');
        this.userDetails = JSON.parse(localStorage.getItem('loginUserDetails'))
        this.userName = this.userDetails.customer_detail.name;
        this.userMobileNumber = this.userDetails.customer_detail.mobile;
        this.userEmail = this.userDetails.customer_detail.email;
      });
    });
  }

  // ngDoCheck(){
  //   this.token.currentToken.subscribe(gst => {
  //     this.getToken = gst;
  //     this.accessToken = localStorage.getItem('carterXAccessToken');
  //     this.userDetails = JSON.parse(localStorage.getItem('loginUserDetails'))
  //     this.userName = this.userDetails.customer_detail.name;
  //     this.userMobileNumber = this.userDetails.customer_detail.mobile;
  //     this.userEmail = this.userDetails.customer_detail.email;
  //   });
  // }

  selectBox: any = 1;
  setDateOne() {
    this.selectBox = 1;
    this.meetHour = this.timeOnwards;
    if (this.type_of_services === 1) {
      this.delivery_date = new Date(this.show_select_date_one)
    }
    else if (this.type_of_services === 2 && this.travel_type === 2) {
      this.olaDataForm.controls['date'].setValue(this.show_select_date_one);
      this.delivery_date = new Date(this.selected_date_for_date_picker);
      this.delivery_date = this.delivery_date.setDate(this.selected_date_for_date_picker.getDate() + 3);
      this.delivery_date = new Date(this.delivery_date);
      this.showDate = this.selected_date_for_date_picker.toString().split(' ');
    }
    else {
      this.olaDataForm.controls['date'].setValue(this.show_select_date_one);
      this.showDate = this.show_select_date_one.toString().split(' ');
      this.delivery_date = new Date(this.show_select_date_one);
      this.showDate = this.selected_date_for_date_picker.toString().split(' ');
    }
  }

  setDateTwo() {
    this.selectBox = 2;
    this.meetHour = this.timeOnwards;
    if (this.type_of_services === 1) {
      this.delivery_date = new Date(this.show_select_date_two);
      console.log("this.show_select_date_two",this.show_select_date_two)
      console.log("console.log(this.olaDataForm.value.date)",this.olaDataForm.value.date);
    }
    else if (this.type_of_services === 2 && this.travel_type === 2) {
      console.log('here');
      console.log('show_select_date_two', this.show_select_date_two);
      this.olaDataForm.controls['date'].setValue(this.show_select_date_two);
      this.delivery_date = new Date(this.show_select_date_two);
      this.delivery_date = this.delivery_date.setDate(this.show_select_date_two.getDate() + 3);
      this.delivery_date = new Date(this.delivery_date);
      this.showDate = this.selected_date_for_date_picker.toString().split(' ');
      console.log(this.show_select_date_two)
      console.log(this.olaDataForm.value.date);
    }
    else if (this.type_of_services === 1 && this.travel_type === 2) {
      if (this.olaDataForm.value.time_slot === 5) {
        this.olaDataForm.controls['date'].setValue(this.show_select_date_two);
        this.delivery_date = new Date(this.show_select_date_two);
        this.delivery_date = this.delivery_date.setDate(this.show_select_date_two.getDate() + 1);
        this.delivery_date = new Date(this.delivery_date);
        this.showDate = this.selected_date_for_date_picker.toString().split(' ');
        console.log("this.show_select_date_two",this.show_select_date_two)
        console.log("console.log(this.olaDataForm.value.date)",this.olaDataForm.value.date);
      }
      // if()
    }
    else {
      this.olaDataForm.controls['date'].setValue(this.show_select_date_two);
      this.showDate = this.show_select_date_two.toString().split(' ');
      this.delivery_date = new Date(this.show_select_date_two)
      this.showDate = this.selected_date_for_date_picker.toString().split(' ');
      console.log("this.show_select_date_two",this.show_select_date_two)
      console.log("console.log(this.olaDataForm.value.date)",this.olaDataForm.value.date);
    }
    this.filterTimeSlot();
  }


  coupanAmount: any = 0;
  coupon: any = '';
  couponRes: any;
  discountPercent: any = 0;
  couponDiscount: any = 0;
  discount: any = 0;
  promocode_type: any;
  disable_coupon: any = 1;
  coupon_error: boolean = false;
  coupon_error_msg: any = "";
  applyCoupon() {
    let a = this;
    if (this.userDetails != null) {
      const obj = {
        "promo_code_text": this.coupon,
        "user_id": this.userDetails.customer_detail.id_customer,
        "airport_id": this.olaDataForm.value.airport_id
      }
      this.crud.post(apis.APPLY_COUPON + '&' + localStorage.getItem('accessToken'), obj).subscribe(
        res => {
          // this.insuranceFlag = true;
          this.couponRes = res;
          // this.insuranceDisable = true;
          if (this.couponRes.status === true) {
            this.discountPercent = Number(this.couponRes.promocode[0].discount / 100);
            this.couponDiscount = Number(this.approximateAmount) * Number(this.couponRes.promocode[0].discount / 100);
            this.approximateAmount = (Number(this.approximateAmount) - Number(this.couponDiscount)).toFixed(2);
            this.discount = this.couponRes.promocode[0].discount;
            this.promocode_type = 1;
            this.disable_coupon = 2;
          } else {
            this.coupon_error = true;
            this.coupon_error_msg = this.couponRes.message;
            setTimeout(function () { a.coupon_error = false }, 5000);
          }
        }
      )
    }
    else {
      this.coupon_error = true;
      this.coupon_error_msg = "Please Sign-in";
      setTimeout(function () { a.coupon_error = false }, 5000);
    }
  }

  removeCoupon() {
    this.getApproximateAmount();
    this.disable_coupon = 1;
    this.coupon = '';
  }

  insure: boolean = false;
  finalInsurance: any = 0;
  addInsurance() {
    this.insure = !this.insure;
    if(this.approximateAmount > 0){
      if (this.insure === true) {
        this.approximateAmount = (Number(this.approximateAmount) + Number(this.getInsurance) + (Number(this.getInsurance)) * 0.18).toFixed(2);
        this.approximateAmount = this.approximateAmount;
        this.finalInsurance = (Number(this.getInsurance) + Number(this.getInsurance) * (0.18)).toFixed(2);
      } else {
        this.getApproximateAmount();
        this.finalInsurance = 0;
      }
    }
  }


  showMeet: boolean = false
  openMeet(event) {
    this.showMeet = !this.showMeet;
    event.stopPropagation()
    this.showBagDropdown = false;
    this.showTimeSlotDropDown = false;
    this.showCityDropDown = false;
    this.showAirportDropDown = false;
    this.showCountryDropDown = false;
    this.showStateDropdown = false;
  }

  hideMeet() {
    this.showMeet = false;
    this.showBagDropdown = false;
    this.showTimeSlotDropDown = false;
    this.showCityDropDown = false;
    this.showAirportDropDown = false;
    this.showCountryDropDown = false;
    this.showStateDropdown = false;
  }


  backBtn() {
    window.history.back();
  }
}
