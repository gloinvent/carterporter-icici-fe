import { Component, OnInit, NgZone, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PickAirportService } from '../../../../../../core/services/pick-airport/pick-airport.service';
import { CrudService } from 'src/app/core/services/crud.service';
import { apis, CORPORATE_APIS } from '../../../../../../config/apis';
import { throttleTime } from "rxjs/operators";
import { UtilService } from 'src/app/core/services/util.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { DatePipe, JsonPipe } from '@angular/common';

declare var Razorpay: any;
declare let $: any;

@Component({
  selector: 'app-cargo-transfer-mobile',
  templateUrl: './cargo-transfer-mobile.component.html',
  styleUrls: ['./cargo-transfer-mobile.component.scss']
})
export class CargoTransferMobileComponent implements OnInit {
  cf: FormGroup;
  travel_type: any = 1;
  cityNames: any;
  cityData: any;
  selected_date_for_date_picker: any;
  delivery_date:any;
  current_date:any;
  day = new Date().getDate();
  dDate = new Date();
  notValidDelivery:boolean = true;
  arrival_token:any;
  departure_token:any;

  airportDesc: any = "LOCATION AT AIRPORT: 24/4 CarterX kiosk at Arrivals. Opp. Relay store &FOR DEPARTURES: Order Delivery up to Airline Check-in counters &FOR ARRIVAL:Order Pick up at Luggage Carousel/baggage belts (Domestic and International) &LUGGAGE STORAGE: Available&INTER TERMINAL TRANSFER: N/A"
  
  
  bagJson: any = {
    "bags": [
      {
        'no_of_bags': '<7 kgs',
        'byAirDeparture':`6cf4f167db3c5bd09f76075e5f076460`,
        'bySurfaceDeparture':`3aab4323ba5b0285ded65836e99bfafa`,
        'byExpressDeparture':`b2dcbadc78b53167ba7fcd20a6c72bc1`,
      },
      {
        'no_of_bags': '<15 kgs',
        'byAirDeparture':`eed907045110e0935ecdfe50e4aa223a`,
        'bySurfaceDeparture':`98c5f97c5354ac415585d1b1765a487e`,
        'byExpressDeparture':`cf592918707c4aae8838032fefc80449`,
      },
      {
        'no_of_bags': '<20 kgs',
        'byAirDeparture':`83a390dc9fe9ac3795322397602a8348`,
        'bySurfaceDeparture':`f9e0c96f16ca9c29644249457e2bb08f`,
        'byExpressDeparture':`dd792daa019d74dfa669d3b276c9b89e`,
      },
      {
        'no_of_bags': '<30 kgs',
        'byAirDeparture':`9e030fa83100e5aa0b8d9444303e4463`,
        'bySurfaceDeparture':`0d240687cdad4671a9ef6c8ef816ecbc`,
        'byExpressDeparture':`0eb0cc01a7fb3b0abe31125b5d2c28c6`,
      },
      {
        'no_of_bags': '<40 kgs',
        'byAirDeparture':`b8efae28a637989dfaeecff651e28796`,
        'bySurfaceDeparture':`935fffeb968df1e2a28877c2a0838cba`,
        'byExpressDeparture':`5c584812eaecea1a033a63648fd23012`,
      }
    ]
  }

  hyperLocalBagJson:any = {
    "bags": [
      {
        'no_of_bags': '7 kgs',
        'byHyperLocal':`40b2f13a3e32465eaa98fedc82ddca9f`,
      },
      {
        'no_of_bags': '10 kgs',
        'byHyperLocal':`d208070dc8f614a895fe6dd632494326`,
      },
      {
        'no_of_bags': '20 kgs',
        'byHyperLocal':`d208070dc8f614a895fe6dd632494326`,
      },
      {
        'no_of_bags': '30 kgs',
        'byHyperLocal':`d208070dc8f614a895fe6dd632494326`,
      },
      {
        'no_of_bags': '40 kgs',
        'byHyperLocal':`d208070dc8f614a895fe6dd632494326`,
      },
    ]
  }

  time_slots = [
    {
      description: "2 PM onwards",
      id_slots: 1,
      item_limit: 100,
      order_limit: 20,
      rescedule_description: "",
      slot_end_time: "11:00:00",
      slot_name: "Slot 1",
      slot_start_time: "07:00:00",
      slot_type: 0,
      status: 1,
      time_description: "7 AM - 11 AM",
    },
    {
      description: "6 PM onwards ",
      id_slots: 2,
      item_limit: 100,
      order_limit: 2,
      rescedule_description: "",
      slot_end_time: "15:00:00",
      slot_name: "Slot 2",
      slot_start_time: "11:00:00",
      slot_type: 0,
      status: 1,
      time_description: "11 AM - 3 PM",
    }
  ]

  selected_pincode_array = [
    {
      city: 'Bangalore',
      city_id: 1,
      pincode: '560001',
      airport_id: 3,
      delivery_city:'Hyderabad',
      delivery_city_id: 2,
      deliver_airport_id: 7,
      deliver_pincode: '500001',
      airportDesc: "LOCATION AT AIRPORT: 24/4 CarterX kiosk at Arrivals. Opp. Relay store &FOR DEPARTURES: Order Delivery up to Airline Check-in counters &FOR ARRIVAL:Order Pick up at Luggage Carousel/baggage belts (Domestic and International) &LUGGAGE STORAGE: Available&INTER TERMINAL TRANSFER: N/A"

    },
    {
      city: 'Hyderabad',
      city_id: 2,
      pincode: '500001',
      airport_id: 7,
      delivery_city:'Bangalore',
      delivery_city_id: 1,
      deliver_airport_id: 3,
      deliver_pincode: '560001',
      airportDesc: "LOCATION AT AIRPORT: 24/7 CarterX kiosk.\n&FOR DEPARTURES: Delivery till terminal entry gates.\n&FOR ARRIVAL: Bags to be dropped at CarterX kiosk at Arrivals village. Opp. Café Coffee Day.\n&LUGGAGE STORAGE: Available&INTER TERMINAL TRANSFER: Available"
    },
    {
      city: 'Mumbai & Navi Mumbai',
      city_id: 3,
      pincode: '400001',
      airport_id: 8,
      delivery_city:'Hyderabad',
      delivery_city_id: 2,
      deliver_airport_id: 7,
      deliver_pincode: '500001',
      airportDesc: "LOCATION AT AIRPORT: 24/7 CarterX kiosk. Opp. Arrivals gate and next to Meru cabs counter.\n&FOR DEPARTURES: Delivery till terminal entry gates.\n&FOR ARRIVAL: Bags to be dropped at CarterX kiosk. Opp. Arrivals gate and next to Meru cabs counter.\n&INTER TERMINAL TRANSFER: Available"
    },
    // {
    //   city: 'Navi Mumbai',
    //   city_id: 4,
    //   pincode: '421301',
    //   airport_id: 8,
    //   delivery_city:'Hyderabad',
    //   airportDesc: "LOCATION AT AIRPORT: 24/7 CarterX kiosk. Opp. Arrivals gate and next to Meru cabs counter.\n&FOR DEPARTURES: Delivery till terminal entry gates.\n&FOR ARRIVAL: Bags to be dropped at CarterX kiosk. Opp. Arrivals gate and next to Meru cabs counter.\n&INTER TERMINAL TRANSFER: Available"
    // },
    {
      city: 'New Delhi & NCR',
      city_id: 5,
      pincode: '110001',
      airport_id: 12,
      delivery_city:'Hyderabad',
      delivery_city_id: 2,
      deliver_airport_id: 7,
      deliver_pincode: '500001',
      airportDesc:"LOCATION AT AIRPORT: CarterX Executive presence with a Signage board.\n&FOR DEPARTURES: Delivery till terminal entry gates.\n&FOR ARRIVAL: Bags to be handed over to CarterX Executive with Signage board. ‘Remove domestic and international’.\n&INTER TERMINAL TRANSFER: Available"
    },
    // {
    //   city: 'Noida - NCR UP',
    //   city_id: 6,
    //   pincode: '201301',
    //   airport_id: 12,
    //   delivery_city:'Hyderabad',
    //   airportDesc:"LOCATION AT AIRPORT: CarterX Executive presence with a Signage board.\n&FOR DEPARTURES: Delivery till terminal entry gates.\n&FOR ARRIVAL: Bags to be handed over to CarterX Executive with Signage board. ‘Remove domestic and international’.\n&INTER TERMINAL TRANSFER: Available"
    // },
    // {
    //   city: 'Gurugram - NCR Haryana',
    //   city_id: 7,
    //   pincode: '122001',
    //   airport_id: 12,
    //   delivery_city:'Hyderabad',
    //   airportDesc:"LOCATION AT AIRPORT: CarterX Executive presence with a Signage board.\n&FOR DEPARTURES: Delivery till terminal entry gates.\n&FOR ARRIVAL: Bags to be handed over to CarterX Executive with Signage board. ‘Remove domestic and international’.\n&INTER TERMINAL TRANSFER: Available"
    // },
    // {
    //   city: 'Faridabad - NCR Haryana',
    //   city_id: 8,
    //   pincode: '121001',
    //   airport_id: 12,
    //   delivery_city:'Hyderabad',
    //   airportDesc:"LOCATION AT AIRPORT: CarterX Executive presence with a Signage board.\n&FOR DEPARTURES: Delivery till terminal entry gates.\n&FOR ARRIVAL: Bags to be handed over to CarterX Executive with Signage board. ‘Remove domestic and international’.\n&INTER TERMINAL TRANSFER: Available"
    // },
    // {
    //   city: 'Ghaziabad - NCR UP',
    //   city_id: 9,
    //   pincode: '201001',
    //   airport_id: 12,
    //   delivery_city:'Hyderabad',
    //   airportDesc:"LOCATION AT AIRPORT: CarterX Executive presence with a Signage board.\n&FOR DEPARTURES: Delivery till terminal entry gates.\n&FOR ARRIVAL: Bags to be handed over to CarterX Executive with Signage board. ‘Remove domestic and international’.\n&INTER TERMINAL TRANSFER: Available"
    // },
  ]

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.showDeliveryCityDropDown = false;
    this.showCityDropDown=false;
    this.showBagDropdown = false;
    this.showCountryDropDown = false;
  }

  constructor(
    private pickairport: PickAirportService,
    public fb: FormBuilder,
    private crud: CrudService,
    private razorPays: UtilService,
    private ngxSpinner: NgxSpinnerService,
    private router: Router,
    private ngZone: NgZone,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    //import razorpay
    this.razorPays.lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js').subscribe();
    this.createForm();
    this.getCity();
    this.show_time_slot = 'Select Time Slot';
    this.showCity = 'BANGALORE';
    this.showDeliveryCity = 'Hyderabad'
    localStorage.setItem("firstAirport",this.airportDesc)
    localStorage.setItem("firstAirport",this.airportDesc)

    //Date
    var month = this.dDate.getMonth();
    var year = this.dDate.getFullYear();
    this.current_date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-1, 10, 33, 30, 0);
    this.selected_date_for_date_picker =  new Date(year, month, this.day, 10, 33, 30, 0).toISOString().split("T")[0];
    this.showDate = new Date().toString().split(' ');
    this.delivery_date = new Date(year, month, this.day + 4, 10, 33, 30, 0).toISOString().split("T")[0];
    this.cf.controls['delivery_date'].setValue(this.delivery_date);
    console.log("delivery_date",this.delivery_date);
    this.showDeliveryDate = new Date(this.delivery_date);
    this.filterSlot();
  }


  // create form object
  createForm() {
    this.cf = this.fb.group({
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
      country: ['91', Validators.required],
      date: [this.selected_date_for_date_picker],
      delivery_date:[this.delivery_date],
      pickup_city_id: [1, Validators.required],
      delivery_city_id: ['2',Validators.required],
      bags: ['', Validators.required],
      pick_up_airport:['3', Validators.required],
      delivery_airport:['7', Validators.required],
      pickup_pincode:['560001', Validators.required],
      delivery_pincode:['500001', Validators.required],
      time_slot: ['2',Validators.required],
      drop_pincode : ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern('[0-9]+')
      ]]
    });
  }

  //filter slot
  CurrentTime = new Date().getHours();
  CurrentMin = new Date().getMinutes();
  filterSlot(){
    this.filtered_tilme_slot = [];
    let selectedDate = this.datePipe.transform(this.selected_date_for_date_picker, 'dd MMM y');
    let todayDate = this.datePipe.transform(new Date(), 'dd MMM y');
    debugger
    if (todayDate === selectedDate) {
      for (const i of this.time_slots) {
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
      for (const i of this.time_slots) {
        if (i.slot_type === 0) {
          this.filtered_tilme_slot.push(i);
        }
      }
      console.log(this.filtered_tilme_slot, "filtered_tilme_slot")
    }
  }
  
  //validate name
  getname() {
    if (this.cf.controls['name'].valid) {
      document.getElementById("name").style.border = '1px solid #c7c7c7';
      this.terms_con_checkbox = false;
    }
  }

  //validate mobile
  getMobile() {
    if (this.cf.controls['mobile_number'].valid) {
      document.getElementById("mobile_number").style.border = '1px solid #c7c7c7';
      document.getElementById("mobile_drop").style.border = '1px solid #c7c7c7';
      this.terms_con_checkbox = false;
      this.notValidMobile = false;
      console.log("skcnskn")
    }
  }

  //validate email
  getEmail() {
    if (this.cf.controls['email'].valid) {
      document.getElementById("email").style.border = '1px solid #c7c7c7';
      this.terms_con_checkbox = false;
      this.notValidEmail = false;
    }
  }

  // city data
  countryCodeList: any;
  selectedCountry: any;
  getCity(){
    this.pickairport.getAirport(apis.GET_CITY).subscribe(data => {
      this.cityData = data;
      this.cityNames = this.cityData.response.region;
      this.pincodeAirportSelection();
    });
    this.crud.get(apis.COUNTRY_CODES).subscribe((data: any) => {
      this.countryCodeList = data.codes;
      this.cf.controls['country'].setValue('91');
      this.selectedCountry = this.countryCodeList.find(
        c => c.country_code === "91"
      );
    });
  }

  //GET know is it Air or Surface or Express
  type_of_services: any = 1;
  show_select_date_one: any;
  selectTypeofWay(num) {
    this.type_of_services = num;
    this.setUpDate();
    this.cf.controls['bags'].setValue('');
    this.notValidBag = true;
    this.approximateAmount = 0;
    this.show_time_slot = 'Select Time Slot';
  }

  showCityDropDown: boolean = false;
  selectCityDropdown(event) {
    this.showCityDropDown = !this.showCityDropDown;
    event.stopPropagation();
    this.showDeliveryCityDropDown = false;
    this.showBagDropdown = false;
    this.showCountryDropDown = false;
  }

  showCountryDropDown: any;
  showCuntryDropDown(event) {
    event.stopPropagation();
    this.showCountryDropDown = !this.showCountryDropDown;
    this.showDeliveryCityDropDown = false;
    this.showCityDropDown=false;
    this.showBagDropdown = false;
  }

  showDeliveryCityDropDown: boolean = false;
  selectdeliveryCityDropdown(event) {
    event.stopPropagation();
    this.showDeliveryCityDropDown = !this.showDeliveryCityDropDown;
    this.showCityDropDown=false;
    this.showBagDropdown = false;
    this.showCountryDropDown = false;
  }
  showCity: any;
  selectpickupcity(city) {
    console.log(city);
    this.showCityDropDown = !this.showCityDropDown;
    this.showCity = city.city;
    this.showDeliveryCity  = city.delivery_city;
    this.cf.controls['delivery_city_id'].setValue(city.delivery_city_id);
    this.cf.controls['pickup_city_id'].setValue(city.city_id);
    this.cf.get("pickup_pincode").setValue(city.pincode);
    this.cf.get("pick_up_airport").setValue(city.airport_id);
    localStorage.setItem("firstAirport",city.airportDesc);
    this.cf.get("delivery_pincode").setValue(city.deliver_pincode);
    this.cf.get("delivery_airport").setValue(city.deliver_airport_id);
    localStorage.setItem("secondAirport",city.airportDesc);
    console.log(city)
  }

  showDeliveryCity: any;
  selectdeliverycity(city) {
    console.log(city);
    this.showDeliveryCityDropDown = !this.showDeliveryCityDropDown;
    if(city.region_id === 6){
      this.showDeliveryCity = 'Noida & NCR';
    }
    else if(city.region_id === 4){
      this.showDeliveryCity  = 'Navi Mumbai';
    }
    else{
      this.showDeliveryCity  = city.region_name;
    }
    this.cf.controls['delivery_city_id'].setValue(city.region_id);
    this.pincodeAirportSelection();
    this.notValidDelivery = false;
    this.getApproxPrice();
  }

  //select pincode and airport as per city
  pincodeAirportSelection(){
    for(let i = 0; i<this.selected_pincode_array.length;i++){
      if(this.cf.get("pickup_city_id").value  === this.selected_pincode_array[i].city_id){
        this.cf.get("pickup_pincode").setValue(this.selected_pincode_array[i].pincode);
        this.cf.get("pick_up_airport").setValue(this.selected_pincode_array[i].airport_id);
        localStorage.setItem("firstAirport",this.selected_pincode_array[i].airportDesc);
      }
      if(this.cf.get("delivery_city_id").value === this.selected_pincode_array[i].city_id){
        this.cf.get("delivery_pincode").setValue(this.selected_pincode_array[i].pincode);
        this.cf.get("delivery_airport").setValue(this.selected_pincode_array[i].airport_id);
        localStorage.setItem("secondAirport",this.selected_pincode_array[i].airportDesc);
      }
    }
  }

  click() {
    if (window.pageYOffset > 200) {
      scrollTo(0, 201);
    }
  }

  showDate: any;
  showDeliveryDate:any;
  setUpDate(){
    this.show_time_slot = 'Select Time Slot';
    if(this.type_of_services === 1){
      var date = new Date(this.selected_date_for_date_picker).getDate();
      var month = new Date(this.selected_date_for_date_picker).getMonth();
      var year = new Date(this.selected_date_for_date_picker).getFullYear();
      this.delivery_date = new Date(year, month, date + 4, 10, 33, 30, 0).toISOString().split("T")[0];
      this.cf.controls['delivery_date'].setValue(this.delivery_date);
      console.log("delivery_date",this.delivery_date);
    }
    else if(this.type_of_services === 2){
      var date = new Date(this.selected_date_for_date_picker).getDate();
      var month = new Date(this.selected_date_for_date_picker).getMonth();
      var year = new Date(this.selected_date_for_date_picker).getFullYear();
      this.delivery_date = new Date(year, month, date + 7, 10, 33, 30, 0).toISOString().split("T")[0];
      this.cf.controls['delivery_date'].setValue(this.delivery_date);
      console.log("delivery_date",this.delivery_date);
    }
    else if(this.type_of_services === 3){
      var date = new Date(this.selected_date_for_date_picker).getDate();
      var month = new Date(this.selected_date_for_date_picker).getMonth();
      var year = new Date(this.selected_date_for_date_picker).getFullYear();
      this.delivery_date = new Date(year, month, date + 2, 10, 33, 30, 0).toISOString().split("T")[0];
      this.cf.controls['delivery_date'].setValue(this.delivery_date);
      console.log("delivery_date",this.delivery_date);
    }
    else if(this.type_of_services === 4){
      var date = new Date(this.selected_date_for_date_picker).getDate();
      var month = new Date(this.selected_date_for_date_picker).getMonth();
      var year = new Date(this.selected_date_for_date_picker).getFullYear();
      this.delivery_date = new Date(year, month, date, 10, 33, 30, 0).toISOString().split("T")[0];
      this.cf.controls['delivery_date'].setValue(this.delivery_date);
      console.log("delivery_date",this.delivery_date);
    }
    this.showDate = new Date(this.selected_date_for_date_picker).toString().split(' ');
    this.showDeliveryDate = new Date(this.delivery_date);
    this.filterSlot()
  }

  showBagDropdown: boolean = false;
  selectBagDropdown(event) {
    this.showBagDropdown = !this.showBagDropdown;
    event.stopPropagation()
    this.showCityDropDown = false;
  }

  getInsurance: any = 8;
  
  selectBag(item) {
    console.log("item,item", item);
    this.showBagDropdown = false;
    this.cf.controls['bags'].setValue(item.no_of_bags);
    this.approximateAmount = 0;
    if(this.type_of_services === 1){
      this.departure_token = item.byAirDeparture;
    }
    else if(this.type_of_services === 2){
      this.departure_token = item.bySurfaceDeparture;
    }
    else if(this.type_of_services === 3){
      this.departure_token = item.byExpressDeparture;
    }
    this.notValidBag = false;
    this.getApproxPrice();
  }

  ///Amount calculation function
  approximateAmount:any = 0;
  loading:boolean = false;
  priceDetailsRes:any;
  arrival_amount:any = 0;
  departure_amuount:any = 0
  getApproxPrice() {
    this.loading = true;
    this.approximateAmount = 0;
    //Arrival calculation
    const reqBody = {
      order_type: 1,
      transfer_type: this.type_of_services === 2 ? 1 : 2,
      airport_name: this.cf.get("pick_up_airport").value + '',
      city_name: this.cf.get("pickup_city_id").value,
      state_name: 0,
      excess_weight_purchased: "no",
      excess_weight: 0,
      bag_weight: 0,
      no_of_units: "1",
      pincode: this.cf.get("pickup_pincode").value,
      service_type: 1
    };
    this.crud
      .postWithCorporateTokenCargo(
        CORPORATE_APIS.GET_APPROX_AMOUNT,
        reqBody, this.departure_token 
      )
      .pipe(throttleTime(250))
      .subscribe(
        (data: any) => {
          this.loading = false;
          console.log("\n\n ========== price ========== \n\n", data);
          this.priceDetailsRes = data;
          console.log("pricedetails", this.priceDetailsRes);
          // if (data && data.price_details && data.price_details.price_with_gst) {
          this.arrival_amount = data.price_details.price_with_gst;
          this.approximateAmount =Number(this.arrival_amount);

          // if(this.type_of_services !== 4){
          //   //Departure calculation
          // const reqBody = {
          //   order_type: 1,
          //   transfer_type: this.type_of_services === 2 ? 1 : 2,
          //   airport_name: this.cf.get("delivery_airport").value + '',
          //   city_name: this.cf.get("delivery_city_id").value,
          //   state_name: 0,
          //   excess_weight_purchased: "no",
          //   excess_weight: 0,
          //   bag_weight: 0,
          //   no_of_units: "1",
          //   pincode: this.cf.get("delivery_pincode").value,
          //   service_type: 2
          // };
          // this.crud
          // .postWithCorporateTokenCargo(
          //   CORPORATE_APIS.GET_APPROX_AMOUNT,
          //   reqBody, this.arrival_token
          // )
          // .pipe(throttleTime(250))
          // .subscribe(
          //   (data: any) => {
          //     this.loading = false;
          //     console.log("\n\n ========== price ========== \n\n", data);
          //     this.priceDetailsRes = data;
          //     console.log("pricedetails", this.priceDetailsRes);
          //     this.departure_amuount = data.price_details.price_with_gst;
          //     this.approximateAmount =Number(this.departure_amuount + this.arrival_amount);
          //   },
          //   () => (this.loading = false)
          // );
          // }
          // else{
          //   this.approximateAmount =Number(this.arrival_amount);
          // }
        },
      () => (this.loading = false)
    );
  }

    //terms and conditons
  notValidName:boolean = false;
  notValidMobile:boolean = false;
  notValidEmail:boolean = false;
  terms_con_checkbox:boolean = false;
  notValidBag:boolean = true;

  changeCheckBoxValue() {
    this.terms_con_checkbox = !this.terms_con_checkbox;
    this.cf.value.time_slot === '' ? this.slot_dropdown_vlidation = true : this.slot_dropdown_vlidation = false;
    console.log("this.terms_con_checkbox",this.terms_con_checkbox);
    const formValue = { ...this.cf.value };
    if(this.terms_con_checkbox === true){
      // for name
      console.log("formValue.name",formValue.name.length);
      if(formValue.name === ''){
        this.notValidName = true;
        // document.getElementById('name').style.border = '1px solid rgb(254, 120, 1)';
      }
      else{
        this.notValidName = false;
        // document.getElementById('name').style.border = '1px solid rgb(199, 199, 199)';
      }

      if(formValue.mobile_number === ''){
        this.notValidMobile = true;
      }
      else{
        this.notValidMobile = false;
      }

      if(formValue.email === ''){
        this.notValidEmail = true;
      }
      else{
        this.notValidEmail = false;
      }

      if(formValue.bags === ''){
        this.notValidBag = true;
      }
      else{
        this.notValidBag = false;
      }

      if(formValue.drop_pincode === ''){
        this.isPincodeValid = true;
      }
      else{
        this.isPincodeValid  = false;
      }
    }
  }

  //////////proceed
  generateRazorpay() {
    const formValue = { ...this.cf.value };
    let options = {
      // key: "rzp_test_fOTZDy0HmQGnS7",
      key: "rzp_live_LthnWTU5SuA0Hg",
      
      amount: (Number(this.approximateAmount) * 100).toFixed(2),
      currency: "INR",
      name: "CarterPorter",
      description: "Payment towards Carter",
      image: "https://cdn.razorpay.com/logos/Du4P7LfElD9azm_medium.jpg",

      handler: response => {
        this.ngZone.run(() => this.proceedBooking());
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
    console.log(rzp1);
    rzp1.open();
  }

  proceedBooking() {
    this.ngxSpinner.show();
    let order_array = [];
    const formValue = { ...this.cf.value };
      const priceDetails = this.priceDetailsRes;
      const itemsOrder = [];
      const bagItems = priceDetails.price_details.items;
      for (const key in bagItems) {
        if (bagItems.hasOwnProperty(key)) {
          const element = bagItems[key];
          itemsOrder.push({
            bag_type: key,
            price: element
          });
        }
      }

      const reqBody = {
        // order_type: 1,
        transfer_type: this.type_of_services === 2 || this.type_of_services === 4 ? 1 : 2,
        airport_name: formValue.pick_up_airport,
        corporate_type: 4,
        city_name: formValue.pickup_city_id ,
        state_name: 0,
        excess_weight_purchased: "no",
        excess_weight: 0,
        bag_weight: 0,
        no_of_units: 1,
        email: formValue.email,
        pincode: formValue.pickup_pincode,
        items_order: itemsOrder,
        gst_amount: priceDetails.price_details.gst_price,
        luggage_price: priceDetails.price_details.total_luggage_price,
        total_luggage_price: this.arrival_amount,
        outstation_charge: 0,
        excess_bag_amount: 0,
        service_type:  1,
        pickup_slot: formValue.time_slot,
        travell_passenger_name: formValue.name,
        travell_passenger_contact: formValue.mobile_number,
        pick_drop_spots_type: 1,
        building_restriction: {
          "0": 5
        },
        order_date: this.datePipe.transform(formValue.date,'dd MMM y'),
        country_code: formValue.country,
        flight_number: this.type_of_services !== 4 ?  formValue.drop_pincode : formValue.drop_pincode
      };

      

      this.crud
      .postWithDytnamicToken(CORPORATE_APIS.BOOKING, reqBody, this.departure_token 
      )
      .pipe(throttleTime(250))
      .subscribe(
        (data: any) => {
          if (data.status) {
            console.log("\n\n ========== booking ========== \n\n", data);
            const priceDetails = this.priceDetailsRes;
            const itemsOrder = [];
            const bagItems = priceDetails.price_details.items;
            localStorage.setItem("roundTripOneOrderId", data.order_number);
            // if (data.status && (this.type_of_services === 2 || this.type_of_services == 4)) {
              console.log("\n\n ========== booking ========== \n\n", data);
              this.ngxSpinner.hide();
              this.router.navigate(["/order-confirmation-page"]);
            // }
            order_array.push(data.order_number);
            for (const key in bagItems) {
              if (bagItems.hasOwnProperty(key)) {
                const element = bagItems[key];
                itemsOrder.push({
                  bag_type: key,
                  price: element
                });
              }
            }
            // if(this.type_of_services !== 2 && this.type_of_services !== 4){

            //   const reqBody = {
            //     // order_type: 1,
            //     transfer_type: this.type_of_services === 2 || this.type_of_services === 4 ? 1 : 2,
            //     airport_name: formValue.delivery_airport,
            //     corporate_type: 4,
            //     city_name: formValue.delivery_city_id,
            //     state_name: 0,
            //     excess_weight_purchased: "no",
            //     excess_weight: 0,
            //     bag_weight: 0,
            //     no_of_units: 1,
            //     email: formValue.email,
            //     pincode: formValue.delivery_pincode,
            //     items_order: itemsOrder,
            //     gst_amount: priceDetails.price_details.gst_price,
            //     luggage_price: priceDetails.price_details.total_luggage_price,
            //     // priceDetails.price_details.price_with_gst
            //     total_luggage_price: this.arrival_amount,
            //     outstation_charge: 0,
            //     excess_bag_amount: 0,
            //     service_type:  2,
            //     pickup_slot: formValue.time_slot,
            //     travell_passenger_name: formValue.name,
            //     travell_passenger_contact: formValue.mobile_number,
            //     pick_drop_spots_type: 1,
            //     building_restriction: {
            //       "0": 5
            //     },
            //     order_date: this.datePipe.transform(formValue.delivery_date,'dd MMM y'),
            //     country_code: formValue.country,
            //     flight_number: this.showDeliveryCity +'-'+ formValue.drop_pincode
            //   };
  
            //   this.crud
            //   .postWithDytnamicToken(CORPORATE_APIS.BOOKING, reqBody, this.arrival_token
            //   )
            //   .pipe(throttleTime(250))
            //   .subscribe(
            //     (data: any) => {
            //       this.ngxSpinner.hide();
            //       if (data.status) {
            //         console.log("\n\n ========== booking ========== \n\n", data);
            //         this.router.navigate(["/order-confirmation-page"]);
            //         order_array.push(data.order_number);
                    
            //         localStorage.setItem("roundTripOneOrderId", order_array.toString());
            //       }
            //     },
            //   );
            // }
            localStorage.setItem("orderId", data.order_number);
            localStorage.setItem("tabType", 'cargo');
          }
        },
      );
  }

  show_time_slot: any;
  slot_dropdown_vlidation: boolean = false;
  filtered_tilme_slot
  showTimeSlotDropDown: boolean = false;
  selectTimeSLotDropdown(event) {
    this.showTimeSlotDropDown = !this.showTimeSlotDropDown;
    event.stopPropagation()
  }

  selectTimeSlot(value) {
    this.cf.controls['time_slot'].setValue(value.id_slots);
    this.show_time_slot = value.time_description;
    this.slot_dropdown_vlidation = false;
    this.showTimeSlotDropDown = false;
  }

  isPincodeValid:boolean = false;
  validatePickupPincode() {
    if ((this.cf.value.drop_pincode.toString()).length != 6)
      this.isPincodeValid = true;
    else
      this.isPincodeValid = false;

  }

  backBtn() {
    window.history.back();
  }
}
