import {
  Component,
  ElementRef,
  OnInit,
  NgZone,
} from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { DatePipe } from "@angular/common";
import { CrudService } from "src/app/core/services/crud.service";

import { SubscriptionService } from "src/app/core/services/subscription/subscription.service";

import { MatSnackBar } from "@angular/material";
import { NgxSpinnerService } from "ngx-spinner";
import { UtilService } from "src/app/core/services/util.service";
import { throttleTime } from "rxjs/operators";
import { Router } from "@angular/router";
import { PassArrayService } from "src/app/core/services/pass-array.service";
import { MatDialog } from "@angular/material/dialog";
// import { LoginComponent } from "src/app/shared/modals/login/login.component";
import { PickAirportService } from "src/app/core/services/pick-airport/pick-airport.service";
import { PickTimeslotService } from "src/app/core/services/pick-timeslot/pick-timeslot.service";
import { PickStateService } from "src/app/core/services/pick-state/pick-state.service";
import { apis, CORPORATE_APIS, subscription } from "src/app/config/apis";
import { environment } from "src/environments/environment";

declare var Razorpay: any;

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.scss"],
})
export class BookingComponent implements OnInit {

  
  airport_cargo_txt: any = "I certify that there are no passport(s), personal documents of importance, cash, illegal items/substances, immediate medicine, alcohol or jewellery and the carriers(s) i.e CarterX and its associate are further released from any liability arising from the contents of my property.";

  weightJson: any = {
    weights: [
      {
        no_of_weight: "2 kgs",
        price: "",
      },
      {
        no_of_weight: "5 kgs",
        price: "",
      },
      {
        no_of_weight: "7 kgs",
        price: "",
      },
      {
        no_of_weight: "12 kgs",
        price: "",
      },
      {
        no_of_weight: "15 kgs",
        price: "",
      },
      {
        no_of_weight: "20 kgs",
        price: "",
      },
      {
        no_of_weight: "25 kgs",
        price: "",
      },
      {
        no_of_weight: "30 kgs",
        price: "",
      },
      {
        no_of_weight: "40 kgs",
        price: "",
      },
    ],
  };

  bagJson: any = {
    // carterX tokens
    bags: [
      {
        no_of_bags: 1,
        arrival_token: "44878386bbb0c774b89bb91d620823d4",
        departure_token: "44878386bbb0c774b89bb91d620823d4",
      },
      {
        no_of_bags: 2,
        arrival_token: "1e94681feadf26f1fa1cba2ed355e14d",
        departure_token: "442e7a1ed12df02f9554f2682ab3cc67",
      },
      {
        no_of_bags: 3,
        arrival_token: "35fcdff9e7c0b0fad07d7f500ec25b07",
        departure_token: "281acf413c27d996bdeaf43b9ea45845",
      },
      {
        no_of_bags: 4,
        arrival_token: "d778f3f61cb8f1df5deaa2f3d7894eb7",
        departure_token: "7e4b95c57ec67dda7519ff43e795eae9",
      },
      {
        no_of_bags: 5,
        arrival_token: "1ad98984de9bfdfca10f76257b1eb74f",
        departure_token: "2b59017b3fab8a763381444420a98403",
      },
      {
        no_of_bags: 6,
        arrival_token: "a14e0411d009f0156a6cbc8e7921e2d7",
        departure_token: "3837748cc63e6fbddbc7fb5d8e329ea5",
      },
      {
        no_of_bags: 7,
        arrival_token: "38b3192165bef2a2082cd10e21a286c9",
        departure_token: "4b71195e44ddafd61b8b3c6da3ee0a6a",
      },
      {
        no_of_bags: 8,
        arrival_token: "0d702c0a2d4be3ef33d90db2234cd946",
        departure_token: "35072216690e65179a66b087ecd4ffb9",
      },
    ],

    // Akasa Tokens
    bags_akasa: [
      {
        no_of_bags: 1,
        arrival_token: "340b32803acafbf8a1fb236b966e1412",
        departure_token: "340b32803acafbf8a1fb236b966e1412",
      },
      {
        no_of_bags: 2,
        arrival_token: "62f2e8e3a365698cba574e3c43d25ce2",
        departure_token: "62f2e8e3a365698cba574e3c43d25ce2",
      },
      {
        no_of_bags: 3,
        arrival_token: "fd3404e84f32b8dbddc0f64c69d93232",
        departure_token: "fd3404e84f32b8dbddc0f64c69d93232",
      },
      {
        no_of_bags: 4,
        arrival_token: "e772be21fb2234a8207dbc188c32115d",
        departure_token: "e772be21fb2234a8207dbc188c32115d",
      },
      {
        no_of_bags: 5,
        arrival_token: "cbcdeaedf1f3602efaba3b40b60fe505",
        departure_token: "cbcdeaedf1f3602efaba3b40b60fe505",
      },
      {
        no_of_bags: 6,
        arrival_token: "b56a4d70be23792943c4a2024175d292",
        departure_token: "b56a4d70be23792943c4a2024175d292",
      },
      {
        no_of_bags: 7,
        arrival_token: "acf160bfd79e51f48cd95edae91e7764",
        departure_token: "acf160bfd79e51f48cd95edae91e7764",
      },
      {
        no_of_bags: 8,
        arrival_token: "5cfc68cb698c010febbe3e15ea960743",
        departure_token: "5cfc68cb698c010febbe3e15ea960743",
      },
    ],

    // SpiceJet Tokens
    bags_spicejet: [
      {
        no_of_bags: 1,
        arrival_token: "5632a32eac424bfc5248d8d446e160b5",
        departure_token: "058d9c2050d252447b9b7b6ecd626e23",
      },

      {
        no_of_bags: 2,
        arrivalToken: "5632a32eac424bfc5248d8d446e160b5",
        departure_token: "058d9c2050d252447b9b7b6ecd626e23",
      },

      {
        no_of_bags: 3,
        arrivalToken: "5ea52c0a12e05c1858835e29a8fa48bd",
        departure_token: "a0673d1847ed8c762accfbbfc1cdefb0",
      },

      {
        no_of_bags: 4,
        arrivalToken: "66899ce52734254aa3a193b96c6f47ec",
        departure_token: "3dce143eb4bbc9f3a3c458dacfb0a43d",
      },
      {
        no_of_bags: 5,
        arrival_token: "5632a32eac424bfc5248d8d446e160b5",
        departure_token: "058d9c2050d252447b9b7b6ecd626e23",
      },

      {
        no_of_bags: 6,
        arrivalToken: "5632a32eac424bfc5248d8d446e160b5",
        departure_token: "058d9c2050d252447b9b7b6ecd626e23",
      },

      {
        no_of_bags: 7,
        arrivalToken: "5ea52c0a12e05c1858835e29a8fa48bd",
        departure_token: "a0673d1847ed8c762accfbbfc1cdefb0",
      },

      {
        no_of_bags: 8,
        arrivalToken: "66899ce52734254aa3a193b96c6f47ec",
        departure_token: "3dce143eb4bbc9f3a3c458dacfb0a43d",
      },
    ],

    // Vistara ToKens
    bags_vistara: [
      {
        no_of_bags: 1,
        arrival_token: "d5f6d2652ec0cb6d19b524822ec01551",
        departure_token: "d5f6d2652ec0cb6d19b524822ec01551",
      },
      {
        no_of_bags: 2,
        arrival_token: "d5f6d2652ec0cb6d19b524822ec01551",
        departure_token: "d5f6d2652ec0cb6d19b524822ec01551",
      },
      {
        no_of_bags: 3,
        arrival_token: "72c69905b5eeed41d39eeb88e5a9e5c4",
        departure_token: "72c69905b5eeed41d39eeb88e5a9e5c4",
      },
      {
        no_of_bags: 4,
        arrival_token: "de5ebad9e09c3b9b73f0addc6fc05735",
        departure_token: "de5ebad9e09c3b9b73f0addc6fc05735",
      },
      {
        no_of_bags: 5,
        arrival_token: "68ba3d951aed1052a4c107e23f9ef19e",
        departure_token: "68ba3d951aed1052a4c107e23f9ef19e",
      },
      {
        no_of_bags: 6,
        arrival_token: "8bd5e7a7f8a61c740be33b1e1ed2e961",
        departure_token: "8bd5e7a7f8a61c740be33b1e1ed2e961",
      },
      {
        no_of_bags: 7,
        arrival_token: "ffef040b4e3d33ba3bc0bbb695f43c7d",
        departure_token: "ffef040b4e3d33ba3bc0bbb695f43c7d",
      },
      {
        no_of_bags: 8,
        arrival_token: "46c10332d24b8875bbe94e602f6dddfd",
        departure_token: "46c10332d24b8875bbe94e602f6dddfd",
      },
    ],

    // Indigo Tokens
    bags_indigo: [
      {
        no_of_bags: 1,
        arrival_token: "d37a1e3d0fdc52cbfc8f876876925ba3",
        departure_token: "d37a1e3d0fdc52cbfc8f876876925ba3",
      },
      {
        no_of_bags: 2,
        arrival_token: "d37a1e3d0fdc52cbfc8f876876925ba3",
        departure_token: "d37a1e3d0fdc52cbfc8f876876925ba3",
      },
      {
        no_of_bags: 3,
        arrival_token: "e1eacd4217cfac41ca45876237b9730b",
        departure_token: "e1eacd4217cfac41ca45876237b9730b",
      },
      {
        no_of_bags: 4,
        arrival_token: "f519a8dcad9d4183345ee1df49d4f2de",
        departure_token: "f519a8dcad9d4183345ee1df49d4f2de",
      },
      {
        no_of_bags: 5,
        arrival_token: "1b135d2e4001b0edfaa0a8f5a9527396",
        departure_token: "1b135d2e4001b0edfaa0a8f5a9527396",
      },
      {
        no_of_bags: 6,
        arrival_token: "06e8ff61632efe2b11bca3b5cacd5f82",
        departure_token: "06e8ff61632efe2b11bca3b5cacd5f82",
      },
      {
        no_of_bags: 7,
        arrival_token: "1ae2e6ff9b277cdf21a336c54d07389b",
        departure_token: "1ae2e6ff9b277cdf21a336c54d07389b",
      },
      {
        no_of_bags: 8,
        arrival_token: "e3ba9c652b275a11920847ca915fdd23",
        departure_token: "e3ba9c652b275a11920847ca915fdd23",
      },
    ],

    // flyporter
    bags_airAsia: [
      {
        no_of_bags: 1,
        arrival_token: "f2760b33d46a55283b650a600e535ca6",
        departure_token: "f2760b33d46a55283b650a600e535ca6",
      },
      {
        no_of_bags: 2,
        arrival_token: "f2760b33d46a55283b650a600e535ca6",
        departure_token: "f2760b33d46a55283b650a600e535ca6",
      },
      {
        no_of_bags: 3,
        arrival_token: "7ae2239065d1bea96034aaf90b45770d",
        departure_token: "7ae2239065d1bea96034aaf90b45770d",
      },
      {
        no_of_bags: 4,
        arrival_token: "ec4ae7883967b1752899d766a06a8fb5",
        departure_token: "ec4ae7883967b1752899d766a06a8fb5",
      },
      {
        no_of_bags: 5,
        arrival_token: "82ec8cf901e1325a4d4e504aa74e9da5",
        departure_token: "82ec8cf901e1325a4d4e504aa74e9da5",
      },
      {
        no_of_bags: 6,
        arrival_token: "66b8d62a515bb67ec1d5d68d747aac08",
        departure_token: "66b8d62a515bb67ec1d5d68d747aac08",
      },
      {
        no_of_bags: 7,
        arrival_token: "aa553f64dd9be0039ec4988090c543de",
        departure_token: "aa553f64dd9be0039ec4988090c543de",
      },
      {
        no_of_bags: 8,
        arrival_token: "795bc1e63fea358f928e3676ee9f9bc4",
        departure_token: "795bc1e63fea358f928e3676ee9f9bc4",
      },
    ],
  };

  selected_pincode_array = [
    {
      city: "Bangalore",
      city_id: 1,
      pincode: "560300",
    },
    {
      city: "Hyderabad",
      city_id: 2,
      pincode: "501218",
    },
    {
      city: "Mumbai & Navi Mumbai",
      city_id: 3,
      pincode: "400099",
    },
    {
      city: "New Delhi & NCR",
      city_id: 5,
      pincode: "110037",
    },
  ];

  states = [
    "Jammu & Kashmir",
    "Jammu",
    "Kashmir",
    "Jammu and Kashmir",
    "Arunachal Pradesh",
    "Assam",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Tripura",
    "Sikkim",
  ];

  exsistingCityArray = [
    "Bangalore",
    "Bengaluru",
    "Thane",
    "Telangana",
    "Hyderabad",
    "Delhi",
    "New Delhi",
    "New Delhi & NCR",
    "Noida",
    "Mumbai",
    "Navi Mumbai",
    "Mumbai & Navi Mumbai",
    "Faridabad",
    "Gurgaon",
    "Ghaziabad",
    "Gautam Buddha Nagar",
    "Sikandrabad",
    "Jewer",
    "Achheja",
    "Dadri",
    "Bisara",
    "Bishrakh",
    "Dhoom",
    "Maicha",
    "Piyaoli",
    "Nuh",
    "Airoli",
    "Ghansoli",
    "Kopar",
    "Khairane",
    "Juhu Nagar",
    "Vashi",
    "Turbhe",
    "Sanpada",
    "Juinagar",
    "Nerul",
    "Darave",
    "Dronagiri",
    "Karave Nagar",
    "CBD Belapur",
    "Kharghar",
    "Kamothe",
    "New Panvel",
    "Kalamboli",
    "Ulwe",
    "Taloja",
  ];

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
    },
  ];

  coupon_array: any = [
    { coupon_id: 1, coupon_status: false },
    { coupon_id: 2, coupon_status: false },
    { coupon_id: 3, coupon_status: false },
    { coupon_id: 4, coupon_status: false },
    { coupon_id: 5, coupon_status: false },
    { coupon_id: 6, coupon_status: false },
    { coupon_id: 7, coupon_status: false },
    { coupon_id: 8, coupon_status: false },
    { coupon_id: 9, coupon_status: false },
    { coupon_id: 10, coupon_status: false },
  ];

  // --------------------------------------------------------------
  stateName: any;
  selectedCityData: any;
  convenienceCharge: any;
  luggageGst: any;
  bookingForm: FormGroup;
  selected_time_slot: any;
  selected_city: any;
  selected_airport: any;
  showAddressDropDown: any;
  showAddressDropDownDelivery: any;
  fullAddressLine: any;
  fullDeliveryAddressLine: any;
  addressPincode: any;
  deliveryPincode: any;
  cityName: any;
  locality_name: any;
  area: any;
  secondArea: any;
  address: any;
  submitted: any;
  // address_id: any;
  place_id: any;
  airport_city_name:any = "";
  // --------------------------------------------------------------
  buttonCount = 0;
  dcrsCount = 10;
  distance: number;
  changeColor = [false, false, false];

  cityData: any;
  cityNames: any = [];
  airportnames: any;
  countryCodeList: any;
  selectedCountry: any;
  timeSlotData: any;
  timeSlotData1: any = [];
  statedata: any;
  statenames: any;
  type_of_services: any = 2;
  show_select_date_one: any;
  travel_type: any = 1;
  show_select_date_two: any;
  showDate: any = [];
  airports: any = [];
  showAirport: any = "";
  approxAmount: any;
  approximateAmount: any = 0;
  loading: boolean = false;
  priceDetailsRes: any;
  filtered_tilme_slot: any = [];
  show_delivery_time: any;
  show_delivery: boolean = false;
  timeOnwards: any;
  nextDate: any;
  showMeetDrop: boolean = false;
  afterBefore: any;
  Currentdate: any;
  selected_date_for_date_picker: any;
  date = new Date();
  delivery_date: any;
  CurrentTime = new Date().getHours();
  CurrentMin = new Date().getMinutes();
  accessToken: any;
  getToken: any;
  userDetails: any;
  userName: any;
  userMobileNumber: any;
  userEmail: any;
  states_array: any = [];
  selectBox: any = 1;
  token: any;
  show_state: any = "";
  showDeliveryDate: any;
  //
  meetHour: any = 0;
  meetMin: any = 0;
  showMeet: boolean = false;
  meet_hour_error_box: boolean = false;
  meet_time_error_msg: any = "";
  btnDisabled = false;
  btnDisabled2 = true;
  used_coupons :any;
  subscription_gst_price: any;
  remaining_usages:any;
  total_usages:any;

  //constructor
  constructor(
    private elem: ElementRef,
    public fb: FormBuilder,
    private datePipe: DatePipe,
    private pickairport: PickAirportService,
    private picktimeslot: PickTimeslotService,
    private crud: CrudService,
    private subscription: SubscriptionService,
    private _snackbar: MatSnackBar,
    private ngZone: NgZone,
    private razorPays: UtilService,
    private ngxSpinner: NgxSpinnerService,
    private router: Router,
    private pickstate: PickStateService,
    public dialog: MatDialog,
    private tokens: PassArrayService
  ) {
    // this.elem.nativeElement.style.setProperty("--value", 0);
    this.elem.nativeElement.style.setProperty("--value", 0);
  }

  // NgOnInit
  ngOnInit() {
    this.tokens.getNameOFUser.subscribe((name) => {
      if(location.pathname == '/home'){
        this.createBookingForm();
        this.pickCityFunction();
        this.razorPays.lazyLoadLibrary("https://checkout.razorpay.com/v1/checkout.js").subscribe();
      }
    });
  }

  // create ola booking form object
  createBookingForm() {
    this.bookingForm = this.fb.group({
      date: [""],
      pincode: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("[0-9]+"),],],
      city_id: ["", Validators.required],
      bags: ["", Validators.required],
      airport_id: ["", Validators.required],
      time_slot: ["", Validators.required],
      country: ["91", Validators.required],
      state_id: [""],
      name: ["", Validators.required],
      transfer_type: ["", Validators.required],
      mobile_number: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],],
      email: ["", Validators.compose([ Validators.required,Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),]),],
      type: ["Departure", Validators.required],
      terminal: ["", Validators.required],
      airline: ["IndiGo", Validators.required],
      pickup_type: ["Airport: Drop off Point", Validators.required],
      pnr: ["", Validators.compose([ Validators.required, Validators.minLength(6), Validators.maxLength(6),]),],
      other_airline_no: ["none", Validators.required],
      other_airline: ["none", Validators.required],
      fulladdress: [""],
      fullDeliveryAddress: [""],
      addressLineOne: ["", Validators.required],
      deliveryAddressLineOne: ["", Validators.required],
      addressLineTwo: [""],
      deliveryAddressLineTwo: [""],
      addressCity: ["", Validators.required],
      deliveryAddressCity: ["", Validators.required],
      term: [false, Validators.required],
      delivery_type: ["Airport Transfer", Validators.required],
      cargo_terminal: ["Rush Air", Validators.required],
      parcel_type: ["", Validators.required],
      no_of_booking: [1, Validators.required],
      cargo_content: ["", Validators.required],
      other_content: ["", Validators.required],
      weight: ["", Validators.required],
      delivery_date: ["", Validators.required],
      addressPincodes: [""],
      subscription_id: [""],
      otp: [""],
    });
    setTimeout(()=>{this.setLoginDetails();},100)
  }

  setLoginDetails() {
    if(localStorage.loginUserDetails) {
      this.approximateAmount = 0;
      let obj = JSON.parse(localStorage.getItem("loginUserDetails"));
      this.bookingForm.controls["name"].setValue(obj.customer_detail.name);
      this.bookingForm.controls["mobile_number"].setValue(obj.customer_detail.mobile)
      this.bookingForm.controls["email"].setValue(obj.customer_detail.email)
      this.subscription_details.subscription_tokens.length == 0 ? this.get_subscription_list() : '';
      this.user_details_disable = true
    }
    // ['name','mobile_number','email'].map((res)=>{this.bookingForm.controls[res].disable()});
    // this.user_details_disable = true;
  }

  get_subscription_list(){
    this.ngxSpinner.show();
    this.subscription.subscription_validation(subscription.FETCH_SUBSCRIBER_DETAILS,{'email':this.bookingForm.controls["email"].value,'mobile':this.bookingForm.controls["mobile_number"].value}).subscribe((res:any)=>{
      if(res.subscriber_detail.length != 0){
        this.process_tokens(res.subscriber_detail);
        this.subscription_details.show_coupons = true;
      }
      this.ngxSpinner.hide();
    },()=>{this.ngxSpinner.hide();})
  }

  selectTypeofWay(num) {
    this.delivery_date = this.afterBefore = this.show_delivery_time = this.show_state = this.showAirport = "";
    this.airports = [];
    this.showMeetDrop = false;
    this.type_of_services = num;
    this.selectBox = 1;
    this.filterAirports();
    ["city_id", "airport_id"].map((res: any) => {this.bookingForm.controls[res].setValue("");});
    this.Currentdate = new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1, 10, 33, 30, 0);
    this.selected_date_for_date_picker = new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (this.bookingForm.controls["type"].value == "Departure" ? 1 : 0), 10, 33, 30, 0 );
    this.showDate = this.selected_date_for_date_picker.toString().split(" ");
    this.show_select_date_one = new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 10, 33, 30, 0 );
    this.show_select_date_two = new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 10, 33, 30, 0 );
    this.pickTimeSlotFunction();
  }

  // date click event
  click(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // DropDown Value set function
  handleDropdownEvent(formControllName, value) {
    switch (formControllName) {
      case "delivery_type":
        ["airline", "terminal"].map((res) => { this.bookingForm.controls[res].setValue("");});
        
        this.bookingForm.controls["airline"].setValue("IndiGo");
        ["other_airline_no", "other_airline"].map((res)=> { this.bookingForm.controls[res].setValue("none");});
        this.bookingForm.controls["delivery_type"].setValue(value);
        // 
        if (value == "Lost Luggage/Item/Not Loaded") {
          this.bookingForm.controls["type"].setValue("Arrival");
          if(localStorage.loginUserDetails && this.subscription_details.subscription_tokens.length == 0) {
            this.get_subscription_list();
          }
        } else if (value == "Airport Transfer") {
          this.bookingForm.controls["type"].setValue("Departure");
          if(localStorage.loginUserDetails && this.subscription_details.subscription_tokens.length == 0) {
            this.get_subscription_list();
          }
        } else {
          this.bookingForm.controls["type"].setValue("none");
        }
        // 
        this.showDeliveryDate = "";
        this.change_Delivery_type();
        value == "Cargo Transfer" ? this.getCargoApproximateAmount() : null;
        
        break;

      case "cargo_terminal":
        this.bookingForm.controls["cargo_terminal"].setValue(value);
        this.approximateAmount = 0;
        this.bookingForm.controls["weight"].setValue("");

        this.showAddressDropDown = this.showAddressDropDownDelivery =  false;
        this.fullAddressLine = this.deliveryPincode = this.fullDeliveryAddressLine = "";
        ["addressLineOne", "fulladdress", "addressCity", "addressLineTwo", "deliveryAddressLineOne","fullDeliveryAddress","deliveryAddressCity","deliveryAddressLineTwo","addressPincodes"].map((res) => {this.bookingForm.controls[res].setValue("");})
        
        this.setUpDate();
        this.getCargoApproximateAmount();
        break;

      case "cargo_content":
        this.bookingForm.controls["cargo_content"].setValue(value);
        // value == "Others"
        value == "Others" ? this.bookingForm.controls["other_content"].setValue("") : this.bookingForm.controls["other_content"].setValue("none");
        
        break;

      case "parcel_type":
        this.bookingForm.controls["parcel_type"].setValue(value);
        this.bookingForm.controls["weight"].setValue("");
        this.approximateAmount = 0;
        
        break;

      case "weight":
        this.bookingForm.controls["weight"].setValue(value.no_of_weight);
        this.approximateAmount = Number(value.price);
        
        break;

      case "no_of_booking":
        this.bookingForm.controls["no_of_booking"].setValue(value);
        
        break;

      case "time_slots":
        this.bookingForm.controls["time_slot"].setValue(value.id_slots);
        this.selected_time_slot = value.time_description;
        
        break;

      case "type":
        this.bookingForm.controls["type"].setValue(value);
        this.changeTravelType(value == "Departure" ? 1 : 2);
        this.bookingForm.controls["pickup_type"].setValue(value != "Departure" ? "Airport: Pickup Point": "Airport: Drop off Point");
        this.pickCityFunction();
        this.filterTimeSlot();
        
        break;

      case "terminal":
        this.bookingForm.controls["terminal"].setValue(value);
        if (this.subscription_details.show_coupons) {
          this.approximateAmount = 0;
          this.bookingForm.controls["bags"].setValue("");
        }
        
        break;

      case "country":
        this.bookingForm.controls["country"].setValue(value.country_code);

        break;

      case "airline":
        this.approximateAmount = 0;
        this.bookingForm.controls["airline"].setValue(value);
        this.bookingForm.controls["bags"].setValue(1);

        // value == "Other Airlines"
        value == "Other Airlines" ? this.bookingForm.controls["other_airline"].setValue("") : this.bookingForm.controls["other_airline"].setValue("none")
        
        // subscription_details.show_coupons true then are distance based price calculated
        // && this.subscription_details.used_tokens.length != 0
        this.subscription_details.show_coupons ? this.getSupscriptionPrice() : (this.distance ? this.getApproximateAmount() : null)
        
        break;

      case "pickup_type":
        this.bookingForm.controls["pickup_type"].setValue(value);
        this.approximateAmount =  this.distance = 0;
        this.selected_airport = this.fullAddressLine = "";
        ["addressLineOne", "addressLineTwo", "addressCity", "addressPincodes", "airport_id",].map((res: any) => { this.bookingForm.controls[res].setValue("");});
        
        break;

      case "address":
        this.getdistance();
        this.bookingForm.controls["addressLineOne"].setValue(value.pick_drop_address);
        
        // subscription_details.show_coupons true then are distance based price calculated
        this.subscription_details.show_coupons ? this.getSupscriptionPrice() : (this.distance ? this.getApproximateAmount() : null)

        this.bookingForm.controls["addressCity"].setValue("none");
        this.fullAddressLine = value.pick_drop_address;
        break;

      // case "city":
      //   this.selectcity(value);
      //   this.bookingForm.controls["addressLineOne"].setValue("");
      //   this.bookingForm.controls["addressCity"].setValue("");
      //   this.fullAddressLine = this.selected_airport = "";
      // break;

      case "airport":
        this.airport_city_name = "";
        this.bookingForm.controls["airport_id"].setValue(Number(value.airport_name_id));
        this.selected_airport = value.airport_name;

        this.selected_pincode_array.map((res) => {
          if (Number(value.fk_tbl_city_of_operation_region_id) == Number(res.city_id)) {
            this.bookingForm.controls["pincode"].setValue(res.pincode);
            this.bookingForm.controls["city_id"].setValue(res.city_id);
            this.airport_city_name = res.city
          }
        });

        ["addressLineOne","addressLineTwo","addressCity","addressPincodes",].map((res: any) => { this.bookingForm.controls[res].setValue("");});
        this.fullAddressLine = this.addressPincode = "";
        this.approximateAmount = this.distance = 0;

        // subscription_details.show_coupons true then are distance based price calculated
        this.subscription_details.show_coupons ? this.getSupscriptionPrice() : (this.distance ? this.getApproximateAmount() : null)

        // if airport servise selected call pick drop point api
        this.bookingForm.controls["pickup_type"].value == "Airport: Drop off Point" || this.bookingForm.controls["pickup_type"].value == "Airport: Pickup Point" ? this.get_pick_drop_address() : null
        
        break;

      case "time_slot":
        this.bookingForm.controls["time_slot"].setValue(value.id_slots);

        // selected_time_slot base on depature and arraival
        this.selected_time_slot = this.bookingForm.controls["type"].value == "Departure" ? value.time_description : value.slot_name;
        this.selectTimeSlot(value);

        // subscription_details.show_coupons true then are distance based price calculated
        this.subscription_details.show_coupons ? this.getSupscriptionPrice() : (this.distance ? this.getApproximateAmount() : null)

        break;

      case "bags":
        this.bookingForm.controls["bags"].setValue( Number(this.subscription_details.show_coupons ? value : value.no_of_bags));

        // this.token = this.bookingForm.controls["type"].value == "Departure" ? value.arrival_token : value.departure_token;
        
        // subscription_details.show_coupons true then are distance based price calculated
        this.subscription_details.show_coupons ? this.getSupscriptionPrice() : (this.distance ? this.getApproximateAmount() : null)

    }
  }

  // DateTime Picker value change
  datePickerOnChange() {
    // Lost Luggage/Item/Not Loaded means not remove the time slot value
    this.bookingForm.controls["delivery_type"].value == "Lost Luggage/Item/Not Loaded" ? "" : this.bookingForm.controls["time_slot"].setValue("");
    
    this.selected_time_slot = this.delivery_date = this.afterBefore = this.show_delivery_time = "";
    this.showDate = this.selected_date_for_date_picker.toString().split(" ");
    this.timeSlotData1 = [];
    this.filterTimeSlot();
    this.show_select_date_one = new Date(this.selected_date_for_date_picker);
    this.show_select_date_one = this.show_select_date_one.setDate(this.selected_date_for_date_picker.getDate());
    this.show_select_date_one = new Date(this.show_select_date_one);
    this.show_select_date_two = new Date(this.selected_date_for_date_picker);
    this.show_select_date_two = this.show_select_date_two.setDate(this.selected_date_for_date_picker.getDate() + 1);
    this.show_select_date_two = new Date(this.show_select_date_two);
    this.showMeetDrop = false;
  }

  // get Time Solots from Api
  pickTimeSlotFunction() {
    this.picktimeslot.getTimeslot(apis.TIME_SLOTS).subscribe((data: any) => { this.timeSlotData = data.slots; this.filterTimeSlot();});
  }

  // Filter time Slots
  filterTimeSlot() {
    this.filtered_tilme_slot = [];
    let selectedDate = this.datePipe.transform( this.bookingForm.value.date, "dd MMM y");
    let todayDate = this.datePipe.transform(new Date(), "dd MMM y");

    if (this.bookingForm.controls["type"].value == "Departure") {
      if (todayDate === selectedDate) {
        for (const i of this.timeSlotData) {
          let endHour, endMin, endH;
          let str = i.slot_start_time.slice(0, 2);
          let strMin = i.slot_start_time.slice(3, 5);
          endHour = Number(str) - 1;
          endH = Number(str) - 2;
          endMin = Number(strMin) + 30;
          if (i.slot_type === 0) {
            if (this.CurrentTime < endHour) {
              this.CurrentTime === endH && this.CurrentMin > endMin ? null : this.filtered_tilme_slot.push(i)
            }
          }
        }
      } else {
        for (const i of this.timeSlotData) {
          if (i.slot_type === 0) {
            this.filtered_tilme_slot.push(i);
          }
        }
      }
    }
    if (this.bookingForm.controls["type"].value == "Arrival") {
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

  // city and Airport value set
  pickCityFunction() {
    this.pickairport.getAirport(apis.GET_CITY).subscribe((data: any) => {
      this.cityData = data;
      if (data.response) {
        let city_array = [];
        data.response.region.map((item: any) => {
          if (item.region_id != 6 && item.region_id != 7 && item.region_id != 11 && item.region_id != 4 && item.region_id != 8 && item.region_id != 9 && item.region_id != 10 && item.region_id != 12 && item.region_id != 13) {
            if (item.region_name === "Mumbai") {
              item.region_name = "Mumbai & Navi Mumbai";
            }
            if (item.region_name === "New Delhi") {
              item.region_name = "New Delhi & NCR";
            }
            city_array.push(item);
          }
        });
        this.cityNames = city_array;
      }

      this.airportnames = this.cityData.response.airport;
      this.filterAirports();
      this.change_Delivery_type();
    });
    this.crud.get(apis.COUNTRY_CODES).subscribe((data: any) => {
      this.countryCodeList = data.codes;
      this.bookingForm.controls["country"].setValue("91");
      this.selectedCountry = this.countryCodeList.find((c) => c.country_code === "91");
    });
  }

  // address submit values
  submitAddress(type) {
    if (type == 1) {
      if (this.bookingForm.controls["delivery_type"].value != "Airport Transfer") {
        if (this.bookingForm.controls["addressLineTwo"].value != "") {
          this.fullAddressLine = this.bookingForm.controls["addressLineTwo"].value + ", " + this.bookingForm.controls["addressLineOne"].value;
        } else if (this.bookingForm.controls["addressLineTwo"].value == "") {
          this.fullAddressLine = this.bookingForm.controls["addressLineOne"].value;
        }
      }
      this.bookingForm.controls["delivery_type"].value == "Airport Transfer" || this.bookingForm.controls["delivery_type"].value =="Lost Luggage/Item/Not Loaded" ? this.submitAddress1(): (this.showAddressDropDown = this.showAddressDropDownDelivery = false);
    } else if (type == 2) {
      if (this.bookingForm.controls["deliveryAddressLineTwo"].value != "") {
        this.fullDeliveryAddressLine = this.bookingForm.controls["deliveryAddressLineTwo"].value + ", " + this.bookingForm.controls["deliveryAddressLineOne"].value;
      } else if (this.bookingForm.controls["deliveryAddressLineTwo"].value == "") {
        this.fullDeliveryAddressLine = this.bookingForm.controls["deliveryAddressLineOne"].value;
      }
      this.showAddressDropDown = this.showAddressDropDownDelivery = false;
    }
  }

  submitAddress1() {
    this.selected_time_slot = this.delivery_date = "";
    this.bookingForm.controls["delivery_type"].value == "Lost Luggage/Item/Not Loaded" ? null : this.bookingForm.controls["time_slot"].setValue("");
    this.approximateAmount = 0;
    var result;

    // get picode details api
    this.pickairport.getPincode(this.bookingForm.controls["addressPincodes"].value ? this.bookingForm.controls["addressPincodes"].value : "null").subscribe((res) => {
      result = res;
      if (this.bookingForm.controls["addressPincodes"].value == "") {
        this.printToastMsg("Pincode is Mandatory");
      } 
      else if ((result.results && result.results.length == 0) || this.bookingForm.controls["addressPincodes"].value.toString().length != 6) {
        this.printToastMsg("Enter Valid Pincode");
        this.bookingForm.controls["addressPincodes"].setValue("");
      } 
      else {
        let cnt = 0;
        result.results.map((res: any) => {
          if (res.place_id && res.place_id == this.place_id) {
            cnt += 1;
          }
          if (res.postcode_localities && res.postcode_localities.length != 0) {
            res.postcode_localities.map((post: any) => {
              if (this.area == post || this.locality_name == post) {
                cnt += 1;
              }
            });
          }
        });
        if (cnt != 0) {
          if (this.bookingForm.controls["addressLineTwo"].value != "") {
            this.fullAddressLine = this.bookingForm.controls["addressLineTwo"].value + ", " + this.bookingForm.controls["addressLineOne"].value;
            } 
            else if (this.bookingForm.controls["addressLineTwo"].value == "") {
              this.fullAddressLine = this.bookingForm.controls["addressLineOne"].value;
            }
            this.addressPincode = this.bookingForm.controls["addressPincodes"].value;
            this.getdistance();
            this.showAddressDropDown = this.showAddressDropDownDelivery = false;
            this.fullAddressLine.includes(this.bookingForm.controls["addressPincodes"].value) ? null : (this.fullAddressLine = this.fullAddressLine + " " + this.bookingForm.controls["addressPincodes"].value);
          } else {
            this.printToastMsg("Pincode and Selected City Should be Same");
            this.bookingForm.controls["addressPincodes"].setValue("");
          }
        }
      });
  }

  // cargo Rush surface address handling
  submitAddressSurface(){
    var result;
    this.pickairport.getPincode( this.deliveryPincode ? this.deliveryPincode : "null").subscribe((res) => {
      result = res;
      if (this.deliveryPincode == "") {
        this.printToastMsg("Pincode is Mandatory");
      } 
      else if ((result.results && result.results.length == 0) || this.deliveryPincode.toString().length != 6) {
        this.printToastMsg("Enter Valid Pincode");
        this.deliveryPincode = "";
      } 
      else {
        let cnt = 0;
        result.results.map((res: any) => {
          if (res.place_id && res.place_id == this.place_id) {
            cnt += 1;
          }
          if (res.postcode_localities && res.postcode_localities.length != 0) {
            res.postcode_localities.map((post: any) => {
              if (this.secondArea == post || this.locality_name == post) {
                cnt += 1;
              }
            });
          }
        });
        if (cnt != 0) {
          if (this.bookingForm.controls["deliveryAddressLineTwo"].value != "") {
            this.fullDeliveryAddressLine = this.bookingForm.controls["deliveryAddressLineTwo"].value + ", " + this.bookingForm.controls["deliveryAddressLineOne"].value;
          } else if (this.bookingForm.controls["deliveryAddressLineTwo"].value == "") {
            this.fullDeliveryAddressLine = this.bookingForm.controls["deliveryAddressLineOne"].value;
          }
          this.showAddressDropDown = this.showAddressDropDownDelivery = false;
          this.fullDeliveryAddressLine.includes(this.bookingForm.controls["addressPincodes"].value) ? null : (this.fullDeliveryAddressLine = this.fullDeliveryAddressLine + " " + this.deliveryPincode);
        } else {
          this.printToastMsg("Pincode and Selected City Should be Same");
          this.deliveryPincode = "";
        }
      }
    });
  }

  // handle google address values
  async handleAddressChange(e: any) {
    console.log("----- address", e);
    this.place_id = this.area = this.addressPincode = this.distance = undefined;
    this.fullAddressLine = this.locality_name = this.cityName = "";
    this.approximateAmount = 0;
    let address = "";
    let add = e.address_components.length;
    this.bookingForm.controls["fulladdress"].setValue(e.name + ", " + e.formatted_address);
    this.bookingForm.controls["addressPincodes"].setValue("");

    this.place_id = e.place_id ? e.place_id : "";
    for (let i = 0; i < add; i++) {
      if (e.address_components[i].types[0] == "postal_code") {
        e.address_components[i].long_name ? (this.addressPincode = e.address_components[i].long_name) : "";
        this.bookingForm.controls["addressPincodes"].setValue(e.address_components[i].long_name ? e.address_components[i].long_name : "");
      }
      if (e.address_components[i].types[0] == "locality" || e.address_components[i].types[0] == "administrative_area_level_2") {

        e.address_components[i].types[0] == "locality" ? this.locality_name = e.address_components[i].long_name : null;

        if(!this.cityName){
          console.log('Locality cityname ', e.address_components[i].long_name);
          this.cityName = e.address_components[i].long_name;
          // this.locality_name = e.address_components[i].long_name;
        }

        if(e.address_components[i].types[0] == "administrative_area_level_2"){
          console.log('dministration city 2', e.address_components[i].long_name);
          ["Thane","Navi Mumbai","Mumbai",'Bengaluru Urban',"Ghaziabad",'Greater Noida','Faridabad','Gurugram','Noida','New Delhi'].map((res)=>{
            if(e.address_components[i].long_name == res){
              console.log('administration city checking', e.address_components[i].long_name , res )
              this.cityName = e.address_components[i].long_name;
              // this.locality_name = e.address_components[i].long_name;
            }
          })
        }

        if (this.cityName == "Bengaluru" || this.cityName == 'Bengaluru Urban') {
          this.cityName = "Bangalore";
        }

       else if (
          this.cityName == "Mumbai" ||
          this.cityName == "Navi Mumbai" ||
          this.cityName == "Thane"
        ) {
          this.cityName = "Mumbai & Navi Mumbai";
        }

        else if (
          this.cityName == "Mumbai" ||
          this.cityName == "Navi Mumbai" ||
          this.cityName == "Thane"
        ) {
          this.cityName = "Mumbai & Navi Mumbai";
        } 
        else if (
          this.cityName === "New Delhi" ||
          this.cityName === "Noida" ||
          this.cityName === "Gurugram" ||
          this.cityName === "Faridabad" ||
          this.cityName === "Greater Noida" ||
          this.cityName === "Ghaziabad"
        ) {
          this.cityName = "New Delhi & NCR";
        }
      }
      if (e.address_components[i].types[0] == "locality" && !this.area) {
        this.area = e.address_components[i].long_name;
      }
      if (e.address_components[i].types[1] == "sublocality") {
        let add = e.address_components[i].long_name;
        address = address + " " + add;
      }
      if (e.address_components[i].types[0] == "sublocality_level_1") {
        this.area = e.address_components[i].long_name;
      }
      if (e.address_components[i].types[0] == "country") {
        var country = e.address_components[i].long_name;
      }
    }
    this.address = e.name + ", " + address;
    if (
      country === "India" ||
      this.cityName == "Jammu" ||
      this.cityName == "Kashmir"
    ) {
      this.bookingForm.controls["addressCity"].setValue(this.cityName);
      this.bookingForm.controls["addressLineOne"].setValue(e.name + ", " + e.formatted_address);
    } else {
      this.printToastMsg("country is not serviceable");
      this.showAddressDropDown = false;
      ["addressLineOne","addressPincodes", "fulladdress","addressCity", "addressLineTwo",].map((res) => {this.bookingForm.controls[res].setValue("");});
    }
  }

  // close dropdown
  autoCloseForDropdown(event) {
    var target = event.target;
    if (!target.closest(".customDropdownAddressLocal") &&!target.closest(".custom-snackbar")) {
      if((this.deliveryPincode == "" || !this.deliveryPincode) && this.showAddressDropDownDelivery && this.bookingForm.controls['cargo_terminal'].value == 'Rush Surface'){
        this.deliveryPincode = this.fullDeliveryAddressLine = "";
        ["deliveryAddressLineOne","fullDeliveryAddress","deliveryAddressCity","deliveryAddressLineTwo"].map((res) => {this.bookingForm.controls[res].setValue("");})
      }
      this.showAddressDropDown = this.showAddressDropDownDelivery = false;
    }
  }

  bagsDropdownOnClick(event) {
    var target = event.target;
    if (target.closest(".bagsDropdown")) {
      console.log('enter success')
      if(this.subscription_details.show_coupons && this.subscription_details.used_tokens.length == 0) {
        this.printToastMsg("Please select the subscription coupon");
      }
    }
     
  }

  // get state list
  getState() {
    this.states_array = [];
    this.pickstate.getState(apis.GET_STATES_AND_RATES).subscribe((data) => {
      this.statedata = data;
      this.statenames = this.statedata.response.state;
      for (let s of this.statenames) {
        if (s.city_id === Number(1) && Number(3) === s.airport_id) {
          this.states_array.push(s);
        }
      }
    });
  }

  // Change travel type
  changeTravelType(num) {
    this.selected_time_slot = this.selected_city = this.selected_airport = this.fullAddressLine = this.show_state = this.showAirport = this.delivery_date = this.delivery_date = this.afterBefore = this.show_delivery_time = this.addressPincode = "";
    this.selectBox = this.travel_type = 1;
    this.type_of_services = num;
    this.airports = [];
    this.show_delivery = this.submitted = this.showMeetDrop = false;

    this.filterAirports();

    this.bookingForm.controls["delivery_type"].value == "Lost Luggage/Item/Not Loaded" ? this.bookingForm.controls["pickup_type"].setValue('Doorstep Delivery') : this.bookingForm.controls["pickup_type"].setValue(this.bookingForm.controls["type"].value != "Departure" ? "Airport: Pickup Point" : "Airport: Drop off Point" );

    ["term", "addressPincodes", "addressLineOne", "addressLineTwo", "addressCity", "city_id", "airport_id", "pincode", "other_airline_no",].map((res: any) => {
      this.bookingForm.controls[res].setValue(res == "term" ? false : "");
    });

    this.bookingForm.controls["delivery_type"].value == "Lost Luggage/Item/Not Loaded" ? "" : this.bookingForm.controls["time_slot"].setValue("");
    this.bookingForm.controls["pnr"].reset();
    this.bookingForm.controls["term"].setValue(false);
    this.approximateAmount = 0;
  }


  get_bags() {
    switch (this.bookingForm.controls["airline"].value) {
      case "Other Airlines":
        return this.bagJson.bags;
        break;
      case "Akasa Air":
        return this.bagJson.bags_akasa;
        break;
      case "Spicejet":
        return this.bagJson.bags_spicejet;
        break;
      case "Vistara":
        return this.bagJson.bags_vistara;
        break;
      case "IndiGo":
        return this.bagJson.bags_indigo;
        break;
      case "AirAsia (India)":
        return this.bagJson.bags_airAsia;
        break;
      default:
        return [];
    }
  }

  //to filter time slot
  selectTimeSlot(value) {
    this.delivery_date = " ";
    this.bookingForm.controls["time_slot"].setValue(value.id_slots);
    let times = value.slot_end_time;
    let timenumber = times.slice(0, 2);
    if (this.bookingForm.controls["type"].value == "Departure" && this.bookingForm.controls["transfer_type"].value == "Local") {
      this.nextDate = null;
      if (value.id_slots === 5) {
        this.timeOnwards = 14;
        this.timeOnwards = Number(this.timeOnwards);
        this.afterBefore = "Before";
        this.show_delivery_time = this.timeOnwards + ":00";
      } else if (value.id_slots === 7) {
        this.timeOnwards = 2;
        this.timeOnwards = Number(this.timeOnwards);
        this.show_select_date_one = new Date(
          this.selected_date_for_date_picker
        );
        this.show_select_date_one = this.show_select_date_one.setDate(
          this.selected_date_for_date_picker.getDate() + 1
        );
        this.show_select_date_one = new Date(this.show_select_date_one);
        this.show_select_date_two = new Date(
          this.selected_date_for_date_picker
        );
        this.show_select_date_two = this.show_select_date_two.setDate(
          this.selected_date_for_date_picker.getDate() + 2
        );
        this.show_select_date_two = new Date(this.show_select_date_two);
        this.delivery_date = new Date(this.selected_date_for_date_picker);
        this.delivery_date = this.delivery_date.setDate(
          this.selected_date_for_date_picker.getDate() + 1
        );
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = this.timeOnwards + ":00";
        this.afterBefore = "After";
      } else if (value.id_slots === 9) {
        this.timeOnwards = 10;
        this.timeOnwards = Number(this.timeOnwards);
        this.delivery_date = new Date(this.selected_date_for_date_picker);
        this.delivery_date = this.delivery_date.setDate(
          this.selected_date_for_date_picker.getDate()
        );
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = this.timeOnwards + ":00";
        this.afterBefore = "After";
      } else {
        this.timeOnwards = Number(timenumber);
        this.timeOnwards = this.timeOnwards + 2;
        this.timeOnwards = Number(this.timeOnwards);
        this.delivery_date = this.selected_date_for_date_picker;
        this.afterBefore = "After";
        this.show_delivery_time = this.timeOnwards + ":00";
      }
    }
    if (this.bookingForm.controls["type"].value == "Arrival" && this.bookingForm.controls["transfer_type"].value == "Local") {
      this.nextDate = null;
      if (value.id_slots === 5) {
        this.timeOnwards = 15;
        this.timeOnwards = Number(this.timeOnwards);
        this.delivery_date = new Date(this.selected_date_for_date_picker);
        this.delivery_date = this.delivery_date.setDate(
          this.selected_date_for_date_picker.getDate() + 1
        );
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = 14 + ":00";
        this.afterBefore = "Before";
      } else {
        this.show_delivery_time = 23 + ":55";
        this.timeOnwards = 15;
        this.timeOnwards = Number(this.timeOnwards);
        this.delivery_date = this.selected_date_for_date_picker;
        this.afterBefore = "Before";
      }
    }
    if (this.bookingForm.controls["type"].value == "Arrival" &&this.bookingForm.controls["transfer_type"].value == "Outstation") {
      this.nextDate = null;
      if (value.id_slots === 5) {
        this.timeOnwards = 15;
        this.timeOnwards = Number(this.timeOnwards);
        this.delivery_date = new Date(this.selected_date_for_date_picker);
        this.delivery_date = this.delivery_date.setDate(
          this.selected_date_for_date_picker.getDate() + 3
        );
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = 14 + ":00";
        this.afterBefore = "Before";
      } else {
        this.timeOnwards = Number(timenumber);
        this.timeOnwards = 15;
        this.timeOnwards = Number(this.timeOnwards);
        this.delivery_date = new Date(this.selected_date_for_date_picker);
        this.delivery_date = this.delivery_date.setDate(
          this.selected_date_for_date_picker.getDate() + 3
        );
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = 23 + ":55";
        this.afterBefore = "Before";
      }
    }
    if (this.bookingForm.controls["type"].value == "Departure" &&this.bookingForm.controls["transfer_type"].value == "Outstation") {
      this.nextDate = null;
      if (value.id_slots === 5) {
        this.timeOnwards = 14;
        this.delivery_date = new Date(this.selected_date_for_date_picker);
        this.delivery_date = this.delivery_date.setDate(
          this.selected_date_for_date_picker.getDate() + 3
        );
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = this.timeOnwards + ":00";
        this.afterBefore = "After";
      } else if (value.id_slots === 7) {
        this.timeOnwards = 2;
        this.timeOnwards = Number(this.timeOnwards);
        this.delivery_date = new Date(this.selected_date_for_date_picker);
        this.delivery_date = this.delivery_date.setDate(
          this.selected_date_for_date_picker.getDate() + 3
        );
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = this.timeOnwards + ":00";
        this.afterBefore = "After";
      } else if (value.id_slots === 9) {
        this.timeOnwards = 10;
        this.timeOnwards = Number(this.timeOnwards);
        this.delivery_date = new Date(this.selected_date_for_date_picker);
        this.delivery_date = this.delivery_date.setDate(
          this.selected_date_for_date_picker.getDate() + 3
        );
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = "10:00";
        this.afterBefore = "After";
      } else {
        this.timeOnwards = Number(timenumber);
        this.timeOnwards = this.timeOnwards + 2;
        this.timeOnwards = Number(this.timeOnwards);
        this.delivery_date = new Date(this.selected_date_for_date_picker);
        this.delivery_date = this.delivery_date.setDate(
          this.selected_date_for_date_picker.getDate() + 3
        );
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = this.timeOnwards + ":00";
        this.afterBefore = "After";
      }
    }
    this.show_delivery = this.showMeetDrop = true;
    this.selectBox = 1;
  }

  // GetApproximate amount
  getApproximateAmount() {
    this.approximateAmount = 0;
    const formValue = { ...this.bookingForm.value };
    let amount = 0;
    // request body
    const reqBody = {
      order_type: 2,
      transfer_type: 2,
      airport_name: formValue.airport_id,
      city_name: formValue.city_id,
      state_name: 0,
      excess_weight_purchased: "no",
      excess_weight: 0,
      bag_weight: 10,
      no_of_units: formValue.bags,
      pincode: Number(this.addressPincode),
      service_type: formValue.type == "Departure" ? 1 : 2,
    };

    if (this.bookingForm.controls["airline"].value) {
      this.crud.postWithCorporateTokenAirline(CORPORATE_APIS.GET_APPROX_AMOUNT_CALCULATION, reqBody, this.token, formValue.airline, formValue.transfer_type == "Outstation" ? 2 : 1)
        .pipe(throttleTime(250))
        .subscribe(
          (data: any) => {
            this.priceDetailsRes = data;
            amount = Math.round(data.price_details.price_with_gst);
            if (this.bookingForm.controls["transfer_type"].value == "Outstation") {

              for (var x = 0; x <= this.states.length - 1; x++) {

                // jammu and north east state
                if (this.stateName === this.states[x]) {
                  this.convenienceCharge = data.conveyance_charge[8].total_price;
                  this.luggageGst = data.conveyance_charge[8].gst_price;
                  break;
                }

                // distance base calculation
                if (this.stateName !== this.states[x]) {
                  if (this.distance <= 60) {
                    this.convenienceCharge =
                      data.conveyance_charge[0].total_price;
                    this.luggageGst = data.conveyance_charge[0].gst_price;
                  } else if (this.distance <= 130) {
                    this.convenienceCharge =
                      data.conveyance_charge[1].total_price;
                    this.luggageGst = data.conveyance_charge[1].gst_price;
                  } else if (this.distance <= 200) {
                    this.convenienceCharge =
                      data.conveyance_charge[2].total_price;
                    this.luggageGst = data.conveyance_charge[2].gst_price;
                  } else if (this.distance <= 300) {
                    this.convenienceCharge =
                      data.conveyance_charge[3].total_price;
                    this.luggageGst = data.conveyance_charge[3].gst_price;
                  } else if (this.distance <= 400) {
                    this.convenienceCharge =
                      data.conveyance_charge[4].total_price;
                    this.luggageGst = data.conveyance_charge[4].gst_price;
                  } else if (this.distance <= 500) {
                    this.convenienceCharge =
                      data.conveyance_charge[5].total_price;
                    this.luggageGst = data.conveyance_charge[5].gst_price;
                  } else if (this.distance > 500) {
                    this.convenienceCharge =
                      data.conveyance_charge[6].total_price;
                    this.luggageGst = data.conveyance_charge[6].gst_price;
                  }
                }

                // serviceable city
                if (this.airport_city_name == this.bookingForm.controls['addressCity'].value) {
                  // same city
                  if (this.distance <= 60) {
                    this.convenienceCharge =
                      data.conveyance_charge[0].total_price;
                    this.luggageGst = data.conveyance_charge[0].gst_price;
                  } else if (this.distance <= 130) {
                    this.convenienceCharge =
                      data.conveyance_charge[1].total_price;
                    this.luggageGst = data.conveyance_charge[1].gst_price;
                  } else if (this.distance <= 200) {
                    this.convenienceCharge =
                      data.conveyance_charge[2].total_price;
                    this.luggageGst = data.conveyance_charge[2].gst_price;
                  } else if (this.distance <= 300) {
                    this.convenienceCharge =
                      data.conveyance_charge[3].total_price;
                    this.luggageGst = data.conveyance_charge[3].gst_price;
                  } else if (this.distance <= 400) {
                    this.convenienceCharge =
                      data.conveyance_charge[4].total_price;
                    this.luggageGst = data.conveyance_charge[4].gst_price;
                  } else if (this.distance <= 500) {
                    this.convenienceCharge =
                      data.conveyance_charge[5].total_price;
                    this.luggageGst = data.conveyance_charge[5].gst_price;
                  } else if (this.distance > 500) {
                    this.convenienceCharge =
                      data.conveyance_charge[6].total_price;
                    this.luggageGst = data.conveyance_charge[6].gst_price;
                  }
                }
                else {
                  // other serviceable city
                  for (var y = 0; y <= this.exsistingCityArray.length - 1; y++) {
                    if (this.cityName === this.exsistingCityArray[y]) {
                      this.convenienceCharge = data.conveyance_charge[7].total_price;
                      this.luggageGst = data.conveyance_charge[7].gst_price;
                      break;
                    }
                  }
                }
              }

              if (amount != 0) {
                this.approximateAmount = Math.round( Number(this.convenienceCharge) + Number(amount));
                this.loading = false;
              }
            } else if (
              this.bookingForm.controls["transfer_type"].value == "Local"
            ) {
              this.approximateAmount = amount;
              this.loading = false;
            }
          },
          () => (this.loading = false)
        );
    }
  }

  //Proccessed to pay
  proceedToPay() {
    this.submitted = true;

    if (this.bookingForm.valid) {
      if (this.bookingForm.controls["term"].value != false) {
        if (this.approximateAmount) {
          const formValue = { ...this.bookingForm.value };
          let options = {
            key: environment.razorPayKey,
            amount: this.bookingForm.controls["delivery_type"].value == "Airport Transfer" ? Number(this.approximateAmount) * 100 : Number(this.getAmount()) * 100,
            currency: "INR",
            name: "CarterPorter",
            description: "Payment towards Carter",
            image: "https://cdn.razorpay.com/logos/Du4P7LfElD9azm_medium.jpg",

            handler: (response) => {
              this.ngZone.run(() => 
              formValue.delivery_type == "Airport Transfer" || formValue.delivery_type == "Lost Luggage/Item/Not Loaded" ? (this.subscription_details.show_coupons ? this.place_subscription_order() : this.placeOrder()) : this.placeCargoOrder());
            },
            prefill: {
              name: formValue.name,
              email: formValue.email,
              contact: formValue.mobile_number,
            },
            notes: {
              address: "note value",
            },
            theme: {
              color: "#F37254",
            },
            config: {
              display: {
                blocks: {
                  icic: {
                    name: "Pay using ICIC Bank",
                    instruments: [
                      {
                        method: "card",
                        issuers: ["ICIC"]
                      },
                      {
                        method: "netbanking",
                        banks: ["ICIC"]
                      },
                    ]
                  },
                },
                hide: [
                  {
                  method: "upi"
                  }
                ],
                sequence: ["block.icic"],
                preferences: {
                  show_default_blocks: false // Should Checkout show its default blocks?
                }
              }
            },
          };
          const rzp1 = new Razorpay(options);
          rzp1.open();
        } else {
          this.printToastMsg("Something went wrong Please try again later");
        }
      } else {
        this.printToastMsg("Please agree the terms and condition");
        console.log("--------", this.bookingForm);
      }
    } else {
      this.printToastMsg("Please fill in all the highlighted fields");
      console.log("--------", this.bookingForm);
    }
  }

  //place order
  placeOrder() {
    const priceDetails = this.priceDetailsRes;
    const itemsOrder = [];
    const bagItems = priceDetails.price_details.items;
    for (const key in bagItems) {
      if (bagItems.hasOwnProperty(key)) {
        const element = bagItems[key];
        itemsOrder.push({
          bag_type: key,
          price: element,
        });
      }
    }

    this.ngxSpinner.show();
    const formValue = { ...this.bookingForm.value };
    const reqBody = {
      terminal_type: formValue.terminal == "Domestic Travel" ? 2 : 1,
      pick_drop_point: formValue.delivery_type == "Airport Transfer" ? (formValue.pickup_type == "Airport: Drop off Point" || formValue.pickup_type == "Airport: Pickup Point" ? 1 : 2 ) : 2,
      pick_drop_address: this.pick_drop_details.length !=0 ? Number(this.pick_drop_details[0].pick_drop_id): "",
      order_type: 3,
      transfer_type: 2,
      airport_name: formValue.airport_id,
      corporate_type: 4,
      city_name: formValue.city_id,
      state_name: 0,
      excess_weight_purchased: "no",
      excess_weight: 0,
      bag_weight: 0,
      no_of_units: Number(formValue.bags),
      email: formValue.email,
      pincode: formValue.delivery_type == "Airport Transfer" ? (formValue.pickup_type == "Airport: Drop off Point" || formValue.pickup_type == "Airport: Pickup Point" ? formValue.pincode : this.addressPincode) : formValue.addressPincodes,
      items_order: itemsOrder,
      gst_amount: priceDetails.price_details.gst_price,
      luggage_price: priceDetails.price_details.total_luggage_price,
      total_luggage_price: this.approximateAmount,
      outstation_charge: 0,
      excess_bag_amount: 0,
      service_type: formValue.type == "Departure" ? 1 : 2, // 1 for arrival, //2 for departure
      pickup_slot: formValue.time_slot && formValue.time_slot != "none" ? formValue.time_slot : 1,
      travell_passenger_name: formValue.name,
      travell_passenger_contact: formValue.mobile_number,
      pick_drop_spots_type: 1,
      building_restriction: {"0": 5,},
      order_date: this.datePipe.transform(formValue.date, "dd MMM y"),
      country_code: formValue.country,
      flight_number:formValue.other_airline_no && formValue.other_airline_no != "none"? formValue.other_airline_no.toUpperCase() : "",
      pnr_number: formValue.pnr.toUpperCase(),
      address_line_1: this.fullAddressLine,
      address_line_2: "",
      area: this.area,
      delivery_datetime: this.delivery_date
        ? this.delivery_date.toString().split(" ")[2] +
        " " +
        this.delivery_date.toString().split(" ")[1] +
        " " +
        this.delivery_date.toString().split(" ")[3] +
        " " +
        this.show_delivery_time.toString().split(" ")[0]
        : this.selected_date_for_date_picker,
      order_type_str: formValue.delivery_type == "Airport Transfer" ? "Airport Transfer" : "Lost Luggage",
    };
    this.crud
      .postWithStaticTokenAirline( CORPORATE_APIS.BOOKING, reqBody, this.token, formValue.airline, formValue.transfer_type == "Outstation" ? 2 : 1)
      .pipe(throttleTime(250))
      .subscribe(
        (data: any) => {
          if (data.status) {
            localStorage.setItem("order", JSON.stringify([data.order_number]));
            localStorage.setItem("order_from", "airport");
            this.ngxSpinner.hide();
            this.router.navigate(["/order-confirmation"]);
            window.scrollTo(0, 0);
          }
        },
        () => this.ngxSpinner.hide()
      );
  }

  // phone number validation
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // name validation
  validateName(event) {
    if ((event.keyCode < 65 || event.keyCode > 122) && event.key != " ") {
      event.preventDefault();
    }
  }

  // name validation
  validateNameSpace() {
    if (this.bookingForm.controls["name"].value.startsWith(" ")) {
      this.bookingForm.controls["name"].setValue("");
    }
  }

  validatePnr(e) {
    if (((e.which < 65 || e.which > 122) && (e.which < 48 || e.which > 57)) || e.key == "^" || e.key == "_") {
      e.preventDefault();
    }
  }

  validateFlightNo(e){
    if (((e.which < 65 || e.which > 122) && e.key!=' ' !&& (e.which < 48 || e.which > 57)) || e.key == "^" || e.key == "_") {
      e.preventDefault();
    }
  }

  async getdistance() {
    var originpin = this.bookingForm.controls["pincode"].value;
    var destinationpin = this.addressPincode ? Number(this.addressPincode ? this.addressPincode : this.bookingForm.controls["pincode"].value) : Number( this.bookingForm.controls["addressPincodes"].value ? this.bookingForm.controls["addressPincodes"].value : this.bookingForm.controls["pincode"].value);
    
    //distance calculation api 
    var data: any = await this.pickairport.getdistance(originpin,destinationpin);

    if (!this.addressPincode) {
      this.addressPincode = Number(this.bookingForm.controls["addressPincodes"].value? this.bookingForm.controls["addressPincodes"].value: this.bookingForm.controls["pincode"].value);
    }

    var distancemi = data.rows[0].elements[0].distance.text.split(" ")[0];
    this.distance =parseFloat(distancemi.split(",")[0] + distancemi.split(",")[1]) * 1.60934;

    // Local and outstation conditon based on the Kilo Meter
    if (this.distance < 60) {
      this.bookingForm.controls["transfer_type"].setValue("Local"); console.log("local", this.distance);
    } else if (this.distance >= 60) {
      this.bookingForm.controls["transfer_type"].setValue("Outstation"); console.log("outstation", this.distance);
    }

    // subscription_details.show_coupons true then are distance based price calculated
    this.subscription_details.show_coupons ? this.getSupscriptionPrice() : (this.distance ? this.getApproximateAmount() : null)

    if (this.bookingForm.controls["transfer_type"].value == "Outstation") {
      var data: any = await this.pickairport.getState(destinationpin);
      this.stateName = data.result[0].state;
      this.cityName = data.result[0].district;
      if (data.result[0].district === "New Mumbai" || data.result[0].district.split(" ")[1] === "New Mumbai") {
        this.cityName = "Mumbai";
      }
      if (data.result[0].district.split(" ")[1] === "Delhi") {
        this.cityName = "Delhi";
      }
      if (this.cityName === "Bengaluru") {
        this.cityName = "Bangalore";
      }
    }
  }

  // cargo functionality start _________________________________________________________________________________

  // handle google address values
  async handleAddressChangeCargo(e: any, type) { 
    // type 1 means pickup and 2 means delivery
    this.locality_name = this.cityName = "";
    type == 1 ? (this.fullAddressLine = "") : (this.fullDeliveryAddressLine = "");
    type == 1 ? (this.addressPincode = undefined) : (this.deliveryPincode = undefined);
    
    let address = "";
    let add = e.address_components.length;
    
    this.bookingForm.get(type == 1 ? "fulladdress" : "fullDeliveryAddress").setValue(e.name + ", " + e.formatted_address);

    for (let i = 0; i < add; i++) {
      if (e.address_components[i].types[0] == "postal_code") {
        e.address_components[i].long_name ? type == 1 ? (this.addressPincode = e.address_components[i].long_name) : (this.deliveryPincode = e.address_components[i].long_name) : "";
      }
       if (e.address_components[i].types[0] == "locality" || e.address_components[i].types[0] == "administrative_area_level_2") {

      e.address_components[i].types[0] == "locality" ? this.locality_name = e.address_components[i].long_name : null;

       if(!this.cityName){
          console.log('Locality cityname ', e.address_components[i].long_name);
          this.cityName = e.address_components[i].long_name;
          // this.locality_name = e.address_components[i].long_name;
        }

        if(e.address_components[i].types[0] == "administrative_area_level_2"){
          console.log('dministration city 2', e.address_components[i].long_name);
          ["Thane","Navi Mumbai","Mumbai",'Bengaluru Urban',"Ghaziabad",'Greater Noida','Faridabad','Gurugram','Noida','New Delhi'].map((res)=>{
            if(e.address_components[i].long_name == res){
              console.log('administration city checking', e.address_components[i].long_name , res )
              this.cityName = e.address_components[i].long_name;
              // this.locality_name = e.address_components[i].long_name;
            }
          })
        }

        if (this.cityName == "Bengaluru" || this.cityName == 'Bengaluru Urban') {
          this.cityName = "Bangalore";
        }
        else if (
          this.cityName == "Mumbai" ||
          this.cityName == "Navi Mumbai" ||
          this.cityName == "Thane"
        ) {
          this.cityName = "Mumbai & Navi Mumbai";
        }
        else if (
          this.cityName == "Mumbai" ||
          this.cityName == "Navi Mumbai" ||
          this.cityName == "Thane"
        ) {
          this.cityName = "Mumbai & Navi Mumbai";
        } else if (
          this.cityName === "New Delhi" ||
          this.cityName === "Noida" ||
          this.cityName === "Gurugram" ||
          this.cityName === "Faridabad" ||
          this.cityName === "Greater Noida" ||
          this.cityName === "Ghaziabad"
        ) {
          this.cityName = "New Delhi & NCR";
        }
      }
      if (e.address_components[i].types[1] == "sublocality") {
        let add = e.address_components[i].long_name;
        address = address + " " + add;
      }
      if (e.address_components[i].types[0] == "sublocality_level_1") {
        type == 1 ? (this.area = e.address_components[i].long_name) : (this.secondArea = e.address_components[i].long_name);
      }
      if (e.address_components[i].types[0] == "country") {
        var country = e.address_components[i].long_name;
      }
    }

    this.selected_pincode_array.forEach((each) => {
      if (each.city === this.cityName) {
        if (type == 1) {
          this.bookingForm.controls["pincode"].setValue(each.pincode);
          this.bookingForm.controls["city_id"].setValue(each.city_id);
          var airports2 = this.airportnames.filter((res) => {
            return res.fk_tbl_city_of_operation_region_id == each.city_id;
          });
          if (airports2.length != 0) {
            this.bookingForm.controls["airport_id"].setValue(airports2[0].airport_name_id);
          }
        }
        if ((this.addressPincode == undefined || this.addressPincode === "") &&type == 1) {
          this.addressPincode = each.pincode;
        } else if ((this.deliveryPincode == undefined || this.deliveryPincode === "") && type == 2) {
          this.deliveryPincode = each.pincode;
        }
      }
    });
    this.address = e.name + ", " + address;

    if (country === "India" || this.cityName == "Jammu" || this.cityName == "Kashmir") {
      if (this.cityName === "Bangalore" || this.cityName === "Hyderabad" || this.cityName === "Mumbai & Navi Mumbai" || this.cityName === "New Delhi & NCR") {
        this.bookingForm.controls[type == 1 ? "addressCity" : "deliveryAddressCity"].setValue(this.cityName);
        if (this.bookingForm.controls["addressCity"].value != this.bookingForm.controls["deliveryAddressCity"].value) {
          this.bookingForm.controls[type == 1 ? "addressLineOne" : "deliveryAddressLineOne"].setValue(e.name + ", " + e.formatted_address);
        } else {
          this.printToastMsg("Pick up city and delivery city should not be same city");
          this.showAddressDropDown = this.showAddressDropDownDelivery =  false;
          type == 1? (this.fullAddressLine = ""): (this.fullDeliveryAddressLine = "");
          (type == 1 ? ["addressLineOne", "fulladdress", "addressCity", "addressLineTwo"]: ["deliveryAddressLineOne","fullDeliveryAddress","deliveryAddressCity","deliveryAddressLineTwo","addressPincodes",]).map((res) => {
            this.bookingForm.controls[res].setValue("");
          });
        }
      } else {
        this.printToastMsg("city is not serviceable");
        this.showAddressDropDown = false;
        this.showAddressDropDownDelivery = false;
        type == 1 ? (this.fullAddressLine = "") : (this.fullDeliveryAddressLine = "");
        (type == 1 ? ["addressLineOne", "fulladdress", "addressCity", "addressLineTwo"] : ["deliveryAddressLineOne", "fullDeliveryAddress", "deliveryAddressCity", "deliveryAddressLineTwo", "addressPincodes",]).map((res) => {
          this.bookingForm.controls[res].setValue("");
        });
      }
    } else {
      this.printToastMsg("country is not serviceable");
      this.showAddressDropDownDelivery = false;
      type == 1 ? (this.fullAddressLine = ""): (this.fullDeliveryAddressLine = "");
      (type == 1 ? ["addressLineOne", "fulladdress", "addressCity", "addressLineTwo"] : ["deliveryAddressLineOne", "fullDeliveryAddress", "deliveryAddressCity", "deliveryAddressLineTwo", "addressPincodes",]).map((res) => {
        this.bookingForm.controls[res].setValue("");
      });
    }
  }

  // handle google address values for cargo surface
  async handleAddressChangeCargoSurface(e: any, type) { 
    // type 1 means pickup and 2 means delivery
    this.place_id =  this.secondArea = this.deliveryPincode = this.cityName = this.locality_name = "";

    type == 1 ? (this.fullAddressLine = "") : (this.fullDeliveryAddressLine = "");
    type == 1 ? (this.addressPincode = undefined) : (this.deliveryPincode = undefined);
    this.place_id = e.place_id ? e.place_id : "";

    let address = "";
    let add = e.address_components.length;
    
    this.bookingForm.get(type == 1 ? "fulladdress" : "fullDeliveryAddress").setValue(e.name + ", " + e.formatted_address);

    for (let i = 0; i < add; i++) {
      if (e.address_components[i].types[0] == "postal_code") {
        e.address_components[i].long_name ? type == 1 ? (this.addressPincode = e.address_components[i].long_name) : (this.deliveryPincode = e.address_components[i].long_name) : "";
      }
      if (e.address_components[i].types[0] == "locality" || e.address_components[i].types[0] == "administrative_area_level_2") {

        e.address_components[i].types[0] == "locality" ? this.locality_name = e.address_components[i].long_name : null;

        if(!this.cityName){
          console.log('Locality cityname ', e.address_components[i].long_name);
          this.cityName = e.address_components[i].long_name;
          // this.locality_name = e.address_components[i].long_name;
        }

        if(e.address_components[i].types[0] == "administrative_area_level_2"){
          console.log('dministration city 2', e.address_components[i].long_name);
          ["Thane","Navi Mumbai","Mumbai",'Bengaluru Urban',"Ghaziabad",'Greater Noida','Faridabad','Gurugram','Noida','New Delhi'].map((res)=>{
            if(e.address_components[i].long_name == res){
              console.log('administration city checking', e.address_components[i].long_name , res )
              this.cityName = e.address_components[i].long_name;
              // this.locality_name = e.address_components[i].long_name;
            }
          })
        }

        if (this.cityName == "Bengaluru" || this.cityName == 'Bengaluru Urban') {
          this.cityName = "Bangalore";
        }
        else if (
          this.cityName == "Mumbai" ||
          this.cityName == "Navi Mumbai" ||
          this.cityName == "Thane"
        ) {
          this.cityName = "Mumbai & Navi Mumbai";
        }
        else if (
          this.cityName == "Mumbai" ||
          this.cityName == "Navi Mumbai" ||
          this.cityName == "Thane"
        ) {
          this.cityName = "Mumbai & Navi Mumbai";
        } else if (
          this.cityName === "New Delhi" ||
          this.cityName === "Noida" ||
          this.cityName === "Gurugram" ||
          this.cityName === "Faridabad" ||
          this.cityName === "Greater Noida" ||
          this.cityName === "Ghaziabad"
        ) {
          this.cityName = "New Delhi & NCR";
        }
      }

      if (e.address_components[i].types[0] == "locality" && !this.secondArea) {
        this.secondArea = e.address_components[i].long_name;
      }
      if (e.address_components[i].types[0] == "sublocality_level_1") {
        this.secondArea = e.address_components[i].long_name;
      }
      if (e.address_components[i].types[1] == "sublocality") {
        let add = e.address_components[i].long_name;
        address = address + " " + add;
      }
      if (e.address_components[i].types[0] == "country") {
        var country = e.address_components[i].long_name;
      }
    }

    this.address = e.name + ", " + address;

    if (country === "India" || this.cityName == "Jammu" || this.cityName == "Kashmir") {
      this.bookingForm.controls[type == 1 ? "addressCity" : "deliveryAddressCity"].setValue(this.cityName);
      if (this.bookingForm.controls["addressCity"].value != this.bookingForm.controls["deliveryAddressCity"].value) {
        this.bookingForm.controls[type == 1 ? "addressLineOne" : "deliveryAddressLineOne"].setValue(e.name + ", " + e.formatted_address);
      } else {
        this.printToastMsg("Pick up city and delivery city should not be same city");
        this.showAddressDropDown = this.showAddressDropDownDelivery =  false;
        type == 1? (this.fullAddressLine = ""): (this.fullDeliveryAddressLine = "");
        (type == 1 ? ["addressLineOne", "fulladdress", "addressCity", "addressLineTwo"]: ["deliveryAddressLineOne","fullDeliveryAddress","deliveryAddressCity","deliveryAddressLineTwo","addressPincodes",]).map((res) => {
          this.bookingForm.controls[res].setValue("");
        });
        this.deliveryPincode = "";
      }
    } else {
      this.printToastMsg("country is not serviceable");
      this.showAddressDropDownDelivery = false;
      type == 1 ? (this.fullAddressLine = ""): (this.fullDeliveryAddressLine = "");
      (type == 1 ? ["addressLineOne", "fulladdress", "addressCity", "addressLineTwo"] : ["deliveryAddressLineOne", "fullDeliveryAddress", "deliveryAddressCity", "deliveryAddressLineTwo", "addressPincodes",]).map((res) => {
        this.bookingForm.controls[res].setValue("");
      });
      this.deliveryPincode = "";
    }
  }
  // 

  setUpDate() {
    var date = new Date(this.selected_date_for_date_picker).getDate();
    var month = new Date(this.selected_date_for_date_picker).getMonth();
    var year = new Date(this.selected_date_for_date_picker).getFullYear();
    if (this.bookingForm.controls["cargo_terminal"].value == "Rush Air") {
      this.delivery_date = new Date(year, month, date + 4, 10, 33, 30, 0).toISOString().split("T")[0];
      this.bookingForm.controls["delivery_date"].setValue(this.delivery_date);
    } else if (this.bookingForm.controls["cargo_terminal"].value == "Rush Surface") {
      this.delivery_date = new Date(year, month, date + 7, 10, 33, 30, 0).toISOString().split("T")[0];
      this.bookingForm.controls["delivery_date"].setValue(this.delivery_date);
    } else if (this.bookingForm.controls["cargo_terminal"].value == "Rush AirExpress") {
      this.delivery_date = new Date(year, month, date + 2, 10, 33, 30, 0).toISOString().split("T")[0];
      this.bookingForm.controls["delivery_date"].setValue(this.delivery_date);
    }
    this.showDate = new Date(this.selected_date_for_date_picker).toString().split(" ");
    this.showDeliveryDate = new Date(this.delivery_date);
    this.filterSlot();
  }

  filterSlot() {
    this.filtered_tilme_slot = [];
    let selectedDate = this.datePipe.transform(this.selected_date_for_date_picker,"dd MMM y");
    let todayDate = this.datePipe.transform(new Date(), "dd MMM y");
    if (todayDate === selectedDate) {
      for (const i of this.time_slots) {
        let endHour, endMin, endH;
        let str = i.slot_start_time.slice(0, 2);
        let strMin = i.slot_start_time.slice(3, 5);
        endHour = Number(str) - 1;
        endH = Number(str) - 2;
        endMin = Number(strMin) + 30;
        if (i.slot_type === 0) {
          if (this.CurrentTime < endHour) {
            this.CurrentTime === endH && this.CurrentMin > endMin ? null : this.filtered_tilme_slot.push(i);
          }
        }
      }
    } else {
      for (const i of this.time_slots) {
        if (i.slot_type === 0) {
          this.filtered_tilme_slot.push(i);
        }
      }
    }
  }

  change_Delivery_type() {
    this.meetMin1 = this.meetMin = this.meetHour = this.meetHour1 = this.approximateAmount = 0;
    this.submitted = false;
    this.fullAddressLine = this.fullDeliveryAddressLine = this.selected_time_slot = "";
    this.bookingForm.controls["term"].setValue(false);
    
    // manipulate the form values based on the delivery type 
    switch (this.bookingForm.controls["delivery_type"].value) {
      // Airport transfer selected
      case "Airport Transfer":
        ["cargo_content", "delivery_date", "weight", "cargo_terminal", "other_content", "parcel_type","deliveryAddressCity", "deliveryAddressLineOne", "deliveryAddressLineTwo", "fullDeliveryAddress",].map((res) => {this.bookingForm.controls[res].setValue("none");});
        this.bookingForm.controls["airline"].value ? this.bookingForm.controls["bags"].setValue(1) : this.bookingForm.controls["bags"].setValue("");
        this.changeTravelType(1);
        this.bookingForm.controls["pnr"].reset();
        break;

      //cargo transfer selected 
      case "Cargo Transfer":
        ["transfer_type", "airline", "airport_id", "bags", "city_id", "other_airline", "other_airline_no", ].map((res) => { this.bookingForm.controls[res].setValue("none"); });
        [ "time_slot", "cargo_content", "delivery_date", "weight", "cargo_terminal", "other_content", "parcel_type", "deliveryAddressCity", "deliveryAddressLineOne", "deliveryAddressLineTwo", "fullDeliveryAddress", "addressCity", "fulladdress", "addressLineOne", "addressLineTwo",].map((res) => { this.bookingForm.controls[res].setValue("");});
        this.bookingForm.controls["pnr"].setValue("123456");
        this.subscription_details = {show_coupons: false, remin_useage: 0, no_of_usage: 0, subscription_tokens: [], used_tokens: [], };
        break;

      //last lugage 
      case "Lost Luggage/Item/Not Loaded":
        ["cargo_content", "delivery_date", "weight", "cargo_terminal", "other_content", "parcel_type", "deliveryAddressCity", "deliveryAddressLineOne",  "deliveryAddressLineTwo", "fullDeliveryAddress", "time_slot",].map((res) => {this.bookingForm.controls[res].setValue("none");});
        this.bookingForm.controls["airline"].value ? this.bookingForm.controls["bags"].setValue(1) : this.bookingForm.controls["bags"].setValue("");
        this.changeTravelType(1);
        this.bookingForm.controls["pnr"].reset();
        // this.subscription_details = { show_coupons: false, remin_useage: 0, no_of_usage: 0, subscription_tokens: [], used_tokens: [],};
        break;
    }
    this.selectTypeofWay(1);
  }

  async getCargoApproximateAmount() {
    this.ngxSpinner.show();
    this.approximateAmount = 0;
    const formValue = { ...this.bookingForm.value };
    // request body
    const reqBody = {
      order_type: 1,
      transfer_type: formValue.cargo_terminal == "Rush Surface" ? 1 : 2,
      airport_name: formValue.airportId && formValue.airportId != "none" ? formValue.airportId : 3,
      city_name: formValue.cityId && formValue.cityId != "none" ? formValue.cityId : 1,
      state_name: 0,
      excess_weight_purchased: "no",
      excess_weight: 0,
      bag_weight: 0,
      no_of_units: "1",
      pincode: formValue.pincode && formValue.pincode != "none" ? formValue.pincode : 560001,
      service_type: 1,
    };

    this.weightJson.weights.map((response: any) => {
      this.crud.postWithCorporateTokenCargoAirline(CORPORATE_APIS.GET_APPROX_AMOUNT,reqBody,response.no_of_weight,formValue.cargo_terminal ? formValue.cargo_terminal : "Rush Air"
        )
        .pipe(throttleTime(250))
        .subscribe((data: any) => {
          this.priceDetailsRes = data;
          this.approxAmount = Math.round(data.price_details.price_with_gst);
          response.price = this.approxAmount;
        });
    });

    setTimeout(()=>{this.ngxSpinner.hide()},250);
  }

  placeCargoOrder() {
    this.ngxSpinner.show();
    let order_array = [];
    const formValue = { ...this.bookingForm.value };
    const priceDetails = this.priceDetailsRes;
    const itemsOrder = [];
    const bagItems = priceDetails.price_details.items;
    for (const key in bagItems) {
      if (bagItems.hasOwnProperty(key)) {
        const element = bagItems[key];
        itemsOrder.push({
          bag_type: key,
          price: element,
        });
      }
    }
    // Request body
    const reqBody = {
      order_type: 3,
      transfer_type: true,
      airport_name: formValue.airport_id,
      corporate_type: 4,
      city_name: formValue.city_id,
      state_name: 0,
      excess_weight_purchased: "no",
      excess_weight: 0,
      bag_weight: formValue.weight,
      no_of_units: 1,
      email: formValue.email,
      pincode: this.addressPincode,
      items_order: itemsOrder,
      gst_amount: priceDetails.price_details.gst_price,
      luggage_price: priceDetails.price_details.total_luggage_price,
      total_luggage_price: Math.round(Number(this.approximateAmount)),
      outstation_charge: 0,
      excess_bag_amount: 0,
      service_type: 1,
      pickup_slot: formValue.time_slot,
      travell_passenger_name: formValue.name,
      travell_passenger_contact: formValue.mobile_number,
      pick_drop_spots_type: 1,
      building_restriction: {"0": 5,},
      order_date: this.datePipe.transform(formValue.date, "dd MMM y"),
      country_code: formValue.country,
      flight_number: "",
      delivery_datetime:
        this.showDeliveryDate.toString().split(" ")[2] +
        " " +
        this.showDeliveryDate.toString().split(" ")[1] +
        " " +
        this.showDeliveryDate.toString().split(" ")[3] +
        " " +
        "11:55 PM",
      delivery_time_status: "Before",
      address_line_1: this.fullAddressLine,
      address_line_2: "",
      area: this.area,
      second_address_line_1: this.fullDeliveryAddressLine,
      second_address_line_2: "",
      second_area: this.secondArea,
      second_pincode: this.deliveryPincode,
      order_type_str: formValue.delivery_type,
      pick_drop_point: 2,
      terminal_type: formValue.terminal == "Domestic Cargo" ? 2 : 1,
    };
    let count = 0;
    for (let i = 1; i <= Number(formValue.no_of_booking); i++) {
      this.crud.postWithDytnamicTokenAirline(
          CORPORATE_APIS.BOOKING,
          reqBody,
          formValue.weight,
          formValue.cargo_terminal
        )
        .pipe(throttleTime(250))
        .subscribe((data: any) => {
          if (data.status) {
            count += 1;
            order_array.push(data.order_number);
            localStorage.setItem("order", JSON.stringify(order_array));
            if (count == Number(formValue.no_of_booking)) {
              setTimeout(() => {
                localStorage.setItem("order_from", "cargo");
                this.ngxSpinner.hide();
                this.router.navigate(["/order-confirmation"]);
              }, 100);
            }
          }
        });
    }
  }

  getAmount() {
    return (Number(this.approximateAmount) * Number(this.bookingForm.controls["no_of_booking"].value));
  }
  
  //print toast message 
  printToastMsg(msg) {
    this._snackbar.open(msg, "X", {duration: 5000, verticalPosition: "top", panelClass: "custom-snackbar",});
  }
  // cargo functionality ends

  // Airport transfer time line functionality start
  openMeet(event) {
    this.showMeet = !this.showMeet;
    event.stopPropagation();
  }

  increaseMeetHour() {
    let a = this;
    this.showMeet = true;
    if (this.meetHour >= 23) {
      this.meetHour = this.timeOnwards ? this.timeOnwards : 0;
    } else {
      this.meetHour += 1;
    }
    if (this.travel_type === 1 && this.type_of_services === 2) {
      if (this.meetHour > 15) {
        this.delivery_date = new Date(this.delivery_date);
        this.delivery_date = this.delivery_date.setDate(this.selected_date_for_date_picker.getDate() + 1);
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = "14:00";
      }
    }

    if (this.travel_type === 2 && this.type_of_services === 2) {
      if (this.meetHour > 15 && this.meetHour === 16) {
        this.delivery_date = new Date(this.delivery_date);
        this.delivery_date = this.delivery_date.setDate(this.selected_date_for_date_picker.getDate() + 4);
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = this.bookingForm.value.time_slot === 4 ? "14:00" : "14:00";
      }
    }

    if (this.type_of_services === 1) {
      if (this.selectBox === 2) {
        if (this.meetHour > 13 && this.bookingForm.value.time_slot === 1) {
          this.meetHour = this.timeOnwards;
          this.meet_hour_error_box = true;
          this.meet_time_error_msg = "Time cannot be greater than 13:00";
          setTimeout(function () { a.meet_hour_error_box = false;}, 5000);
        } 
        else if (this.meetHour > 17 &&this.bookingForm.value.time_slot === 2) {
          this.meetHour = this.timeOnwards;
          this.meet_hour_error_box = true;
          this.meet_time_error_msg = "Time cannot be greater than 17:00";
          setTimeout(function () { a.meet_hour_error_box = false;}, 5000);
        }
        else if (this.meetHour > 21 &&this.bookingForm.value.time_slot === 3) {
          this.meetHour = this.timeOnwards;
          this.meet_hour_error_box = true;
          this.meet_time_error_msg = "Time cannot be greater than 21:00";
          setTimeout(function () {a.meet_hour_error_box = false;}, 5000);
        } 
        else if (this.meetHour > 2 &&this.bookingForm.value.time_slot === 7 ) {
          this.meetHour = this.timeOnwards;
          this.meet_hour_error_box = true;
          this.meet_time_error_msg = "Time cannot be greater than 2:00";
          setTimeout(function () {a.meet_hour_error_box = false;}, 5000);
        }
      }
    }

    if (this.type_of_services === 2) {
      if (this.selectBox === 1) {
        if (this.bookingForm.value.time_slot === 1 && this.meetHour > 15) {
          this.meetHour = this.timeOnwards;
          this.meet_hour_error_box = true;
          this.meet_time_error_msg = "Time cannot be greater than 13:00";
          setTimeout(function () {a.meet_hour_error_box = false; }, 5000);
        }
      }
    }
  }

  decreaseMeetHour() {
    this.type_of_services =this.bookingForm.controls["type"].value == "Departure" ? 1 : 2;
    this.travel_type = this.bookingForm.controls["delivery_type"].value == "Local" ? 1 : 2;
    let a = this;

    if (this.selectBox === 1) {
      if (this.meetHour <= this.timeOnwards && this.type_of_services !== 2) {
        this.meetHour = this.timeOnwards;
      } else if (this.type_of_services !== 2) {
        this.meetHour == 1 || this.meetHour == 0? (this.meetHour = 24): (this.meetHour -= 1);
      }
      if (this.type_of_services === 2 && this.meetHour > 0) {
        this.meetHour == 1 || this.meetHour == 0? (this.meetHour = 24): (this.meetHour -= 1);
      }
    } else if (this.selectBox === 2) {
      if (this.meetHour <= this.timeOnwards && this.type_of_services !== 2 &&this.meetHour > 0) {
        this.meetHour == 1 || this.meetHour == 0 ? (this.meetHour = 24): (this.meetHour -= 1);
      } else if (this.type_of_services !== 2 && this.meetHour == 0) {
        this.meetHour = this.timeOnwards;
      } else if (this.type_of_services === 2) {
        if (this.meetHour === 0) {
          this.meetHour = 23;
        } else {
          this.meetHour == 1 || this.meetHour == 0 ? (this.meetHour = 24) : (this.meetHour -= 1);
        }
      }
    }

    if (this.travel_type === 1 && this.type_of_services === 2) {
      if (this.meetHour <= 15) {
        this.delivery_date = new Date(this.delivery_date);
        this.delivery_date = this.delivery_date.setDate(this.selected_date_for_date_picker.getDate());
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = this.bookingForm.value.time_slot === 4 ? "23:55" : "14:00";
      }
    }

    if (this.travel_type === 2 && this.type_of_services === 2) {
      if (this.meetHour === 15) {
        this.delivery_date = new Date(this.delivery_date);
        this.delivery_date = this.delivery_date.setDate(this.selected_date_for_date_picker.getDate() + 3);
        this.delivery_date = new Date(this.delivery_date);
        this.show_delivery_time = "23:55";
      }
    } else if (this.type_of_services === 1) {
      if (
        this.bookingForm.value.time_slot === 1 &&
        this.selectBox === 1 &&
        this.meetHour <= this.timeOnwards
      ) {
        this.meetHour = this.timeOnwards;
        this.meet_hour_error_box = true;
        this.meet_time_error_msg = "Time cannot be less than 13:00";
      } else if (
        this.bookingForm.value.time_slot === 1 &&
        this.selectBox === 2 &&
        this.meetHour > this.timeOnwards
      ) {
        this.meetHour = this.timeOnwards;
        this.meet_hour_error_box = true;
        this.meet_time_error_msg = "Time cannot be greater than 13:00";
      } else if (
        this.bookingForm.value.time_slot === 2 &&
        this.selectBox === 1 &&
        this.meetHour <= this.timeOnwards
      ) {
        this.meetHour = this.timeOnwards;
        this.meet_hour_error_box = true;
        this.meet_time_error_msg = "Time cannot be less than 17:00";
      } else if (
        this.bookingForm.value.time_slot === 2 &&
        this.selectBox === 2 &&
        this.meetHour >= this.timeOnwards
      ) {
        this.meetHour = this.timeOnwards;
        this.meet_hour_error_box = true;
        this.meet_time_error_msg = "Time cannot be greater than 17:00";
      } else if (
        this.bookingForm.value.time_slot === 3 &&
        this.selectBox === 1 &&
        this.meetHour <= this.timeOnwards
      ) {
        this.meetHour = this.timeOnwards;
        this.meet_hour_error_box = true;
        this.meet_time_error_msg = "Time cannot be less than 21:00";
      } else if (
        this.bookingForm.value.time_slot === 3 &&
        this.selectBox === 2 &&
        this.meetHour >= this.timeOnwards
      ) {
        this.meetHour = this.timeOnwards;
        this.meet_hour_error_box = true;
        this.meet_time_error_msg = "Time cannot be greater than 21:00";
      } else if (
        this.bookingForm.value.time_slot === 7 &&
        this.selectBox === 1 &&
        this.meetHour <= this.timeOnwards
      ) {
        this.meetHour = this.timeOnwards;
        this.meet_hour_error_box = true;
        this.meet_time_error_msg = "Time cannot be less than 2:00";
      } else if (
        this.bookingForm.value.time_slot === 7 &&
        this.selectBox === 2 &&
        this.meetHour >= this.timeOnwards
      ) {
        this.meetHour = this.timeOnwards;
        this.meet_hour_error_box = true;
        this.meet_time_error_msg = "Time cannot be greater than 2:00";
      } else if (
        this.bookingForm.value.time_slot === 9 &&
        this.selectBox === 1 &&
        this.meetHour <= this.timeOnwards
      ) {
        this.meetHour = this.timeOnwards;
        this.meet_hour_error_box = true;
        this.meet_time_error_msg = "Time cannot be less than 10:00";
      } else if (
        this.bookingForm.value.time_slot === 9 &&
        this.selectBox === 2 &&
        this.meetHour >= this.timeOnwards
      ) {
        this.meetHour = this.timeOnwards;
        this.meet_hour_error_box = true;
        this.meet_time_error_msg = "Time cannot be greater than 10:00";
      }
      setTimeout(function () {
        a.meet_hour_error_box = false;
      }, 5000);
    }
  }

  //
  increaseMeetMin() {
    if (this.meetMin < 59) {
      this.meetMin += 1;
    } else {
      this.meetMin = 0;
    }
  }

  decreaseMeetMin() {
    if (this.meetMin <= 59) {
      this.meetMin = 0;
    } else {
      this.meetMin -= 1;
    }
  }

  meetHour1:any = 0;
  meetMin1:any = 0;

  hideMeet() {
    this.meetHour  = Math.abs(Number(this.meetHour))
    this.meetMin  = Math.abs(Number(this.meetMin))
    if(this.meetHour > 24){
      this.printToastMsg("The Hour Should be less then or equal to 24 ");
      this.meetHour = 0;
    }else if(this.meetMin > 60){
      this.printToastMsg("The Min Should be less then or equal to 60 ")
      this.meetMin = 0;
    }else{
      
      if((this.meetHour || this.meetMin) && (this.meetHour != 0 || this.meetMin != 0)){
        this.showMeet = false;
        this.meetHour1  = this.meetHour;
        this.meetMin1 = this.meetMin;
        // subscription_details.show_coupons true then are distance based price calculated
        this.subscription_details.show_coupons ? this.getSupscriptionPrice() : (this.distance ? this.getApproximateAmount() : null)
      }else{
        this.printToastMsg("Please select valid time");
      } 
    }
    this.bookingForm.controls["time_slot"].setValue(this.bookingForm.controls["type"].value == "Departure" ? 1 : 5);
  }

  pick_drop_details: any = [];
  get_pick_drop_address() {
    this.ngxSpinner.show();
    const formValue = { ...this.bookingForm.value };
    // request body
    const reqBody = {
      delivery_type: 2,
      departure_type: formValue.type == "Departure" ? 1 : 2,
      pickup_type: 1,
      airport_id: formValue.airport_id,
    };
    this.subscription.subscription_validation(subscription.PICKUP_DROP_ADDRESS,reqBody).subscribe((res: any) => {
        this.pick_drop_details = res.subscriber_detail;
        this.ngxSpinner.hide();
        // 
        if(this.pick_drop_details.length != 0){
          this.getdistance();
          this.bookingForm.controls["addressLineOne"].setValue(this.pick_drop_details[0].pick_drop_address);
          // subscription_details.show_coupons true then are distance based price calculated
          this.subscription_details.show_coupons ? this.getSupscriptionPrice() : (this.distance ? this.getApproximateAmount() : null)
          this.fullAddressLine = this.pick_drop_details[0].pick_drop_address;
          this.bookingForm.controls["addressCity"].setValue("none");
        }
        // 
        console.log("pickup drop", res);
      });
  }

  filterAirports() {
    this.airports = [];
    this.cityData.response.airport.map((item) => {
      if (Number(item.airport_name_id) == 3 || Number(item.airport_name_id) == 7 || Number(item.airport_name_id) == 8 || Number(item.airport_name_id) == 9 || Number(item.airport_name_id) == 12 || Number(item.airport_name_id) == 13 || Number(item.airport_name_id) == 14) {
        this.airports.push(item);
      }
    });
  }

  // subscription functionality start
  subscription_details: any = { show_coupons: false, remin_useage: 0, no_of_usage: 0, subscription_tokens: [], used_tokens: [],  proceed_without_payment: false };

  validateMobile(type) {
    if(this.bookingForm.controls['delivery_type'].value == "Airport Transfer" || this.bookingForm.controls['delivery_type'].value == "Lost Luggage/Item/Not Loaded" ){
      
      this.btnDisabled = true;
      this.btnDisabled2 = true;

      this.ngxSpinner.show();
      const formValue = { ...this.bookingForm.value };
      // request body
      const reqBody = {
        name: formValue.name,
        email: formValue.email,
        number: formValue.mobile_number,
      };
      // validate subscription mobile number and resond otp code api
      this.subscription.subscription_validation(subscription.VALIDATE_SUBSCRIPTION_NUMBER,reqBody).subscribe((res: any) => {
        this.subscription_details.show_coupons = false;
        this.ngxSpinner.hide();
        this.printToastMsg(res.msg);
        setTimeout(() => { 
          this.btnDisabled = false;
          this.btnDisabled2 = false;
         }, 3000);
      });
    }
    else{
      this.printToastMsg('Subscription Not For Cargo Transfer');
    }
    
  }



  validateSubscription() {
    if(this.bookingForm.controls['subscription_id'].value){
      if(this.bookingForm.controls['delivery_type'].value == "Airport Transfer" || this.bookingForm.controls['delivery_type'].value == "Lost Luggage/Item/Not Loaded" ){
        this.ngxSpinner.show();
        const formValue = { ...this.bookingForm.value };
        const reqBody = {subscription_id: formValue.subscription_id,};
        // validate subscription id api
        this.subscription.subscription_validation(subscription.VALIDATE_SUBSCRIPTION_ID, reqBody).subscribe((res: any) => {
          this.ngxSpinner.hide();
          this.printToastMsg(res.msg);
          if(res.subscription_detail){
            this.bookingForm.controls["name"].setValue(res.subscription_detail.name);
            this.bookingForm.controls["email"].setValue(res.subscription_detail.email);
            this.bookingForm.controls["mobile_number"].setValue(res.subscription_detail.mobile);
          }
        });
      }
      else{
        this.printToastMsg('Subscription Not For Cargo Transfer');
      }
    }
    else{
      this.printToastMsg('Please Enter the subscription number');
    }
  }

  user_details_disable:any = false;
  validateOtp() {
    if(this.bookingForm.controls['otp'].value){
      if(this.bookingForm.controls['delivery_type'].value == "Airport Transfer" || this.bookingForm.controls['delivery_type'].value == "Lost Luggage/Item/Not Loaded" ){
        const formValue = { ...this.bookingForm.value };
        const reqBody = {
          email: formValue.email,
          otp: formValue.otp,
          mobile: formValue.mobile_number,
          country_code: formValue.country,
        };
        if (formValue.otp) {
          this.ngxSpinner.show();
          this.subscription.subscription_validation(subscription.OTP_VALIDATE, reqBody).subscribe((res: any) => {
            this.bookingForm.controls["otp"].setValue("");
            if (res.msg == "Number Verified Successfully") {
              // res.subscriber_detail.map((res2)=>{
              //   Number(res2.remaining_usages) == 0 ? res2.coupon_status = true : res2.coupon_status = false;
              // })
              // this.subscription_details.subscription_tokens = res.subscriber_detail ? res.subscriber_detail : [] ;
              // this.format_tokens(res.subscriber_detail);
              if(res.subscriber_detail.length != 0){
                this.process_tokens(res.subscriber_detail);
                this.subscription_details.show_coupons = true;
                this.login_usr_details(formValue,res.subscriber_detail);
              } 
            } else {
              this.subscription_details.show_coupons = false;
            }
            this.ngxSpinner.hide();
            this.printToastMsg(res.msg);
          });
        } else {
          this.printToastMsg("Enter a OTP");
        }
      }
      else{
        this.printToastMsg('Subscription Not For Cargo Transfer');
      }
    }else{
      this.printToastMsg('Enter Valid OTP');
    }
  }

  login_usr_details(form:any ,response:any){
    let loginDetails = {
      "status": true,
      "message": "Number Verified Successfully",
      "customer_detail": {
        "id_customer": response[0].id_customer,
        "name": response[0].name,
        "email": response[0].email,
        "mobile": response[0].mobile,
        "fk_tbl_customer_id_country_code": response[0].fk_tbl_customer_id_country_code ,
        "id_country_code": response[0].fk_tbl_customer_id_country_code,
        "mobile_number_verification": "1",
        "client_id": response[0].client_id,
        "client_secret": response[0].client_secret,
      },
      "saved_address": {
        "registered_address": {},
        "last_order_address": false
      }
    }
    localStorage.setItem('loginUserDetails', JSON.stringify(loginDetails));
    this.tokens.newEventFordata('LoggedIn!');
    this.user_details_disable = true;
   
    this.accessTokenApi({
      client_id: response[0].client_id,
      client_secret: response[0].client_secret,
      grant_type: 'client_credentials'
    });
    // setTimeout(()=>{this.tokens.newEventFordata('LoggedIn!');},200);
    //['name','mobile_number','email'].map((res)=>{this.bookingForm.controls[res].disable()});
  }


  accessTokenApi(obj) {
    this.crud.getToken(apis.GET_LOGIN_TOKEN, obj).subscribe((response:any) => {
      if (response) {
        localStorage.setItem('accessToken', response.access_token);
        this.tokens.passToken(response.access_token);
        localStorage.setItem('carterXAccessToken',response.access_token);
      }
    });
    this.tokens.newEventFordata('LoggedIn!');
  }

  // format_tokens(list: any) {
  //   let new_array = [];
  //   list.map((res: any) => {
  //     var obj = {};
  //     for (let i = 1; i <= Number(res.no_of_usages); i++) {
  //       if (Number(res.remaining_usages) < Number(res.no_of_usages)) {
  //         res.coupon_status = true;
  //       } else {
  //         this.subscription_details.remin_useage += 1;
  //         res.coupon_status = false;
  //       }
  //       obj = { ...res, uid: i };
  //       new_array.push(obj);
  //     }
  //   });
  //   this.process_tokens(new_array);
  // }

  process_tokens(arr) {
    let new_arr = [];
    let cnt  = 1
    arr.map((res: any, index) => {
      // console.log('expiry date ', new Date(Date.now()) <= new Date(res.expire_date))
      if(new Date(Date.now()) <= new Date(res.expire_date) && (res.remaining_usages != '0' && res.remaining_usages != 0)){
        res["uid"] = cnt ; 
        res.remaining_usages == 0 ? (res.coupon_status = true) : (res.coupon_status = false);
        new_arr.push(res);
        cnt += 1;
      }
    });
    this.subscription_details.subscription_tokens = new_arr;
    if(this.subscription_details.subscription_tokens.length != 0){
      this.subscription_details.show_coupons = true;
      this.dcrsCount = this.get_no_of_usage();
      this.buttonCount = this.get_remaining_usage();
      let percent = (Number(this.buttonCount) / Number(this.dcrsCount) * 100 )
      let remain_percent = 100 - Number(percent) 
      // console.log(remain_percent)
      this.elem.nativeElement.style.setProperty("--value", remain_percent);
    }else{
      this.subscription_details.show_coupons = false;
    }
    // this.elem.nativeElement.style.setProperty("--value", this.buttonCount);
    // this.elem.nativeElement.style.setProperty("--totalPercent", this.dcrsCount);
  }

  select_and_unselect_cupons(arg) {
    this.subscription_details.proceed_without_payment = false
    this.approximateAmount = 0;
    this.bookingForm.controls["bags"].setValue("");

    this.subscription_details.subscription_tokens.map((res) => {
      if (arg.subscription_transaction_id == res.subscription_transaction_id) {
        if (res.coupon_status == false) {
          if (this.subscription_details.used_tokens.length != 0) {
            let index = this.subscription_details.subscription_tokens.findIndex((res) => res.uid == this.subscription_details.used_tokens[0].uid);
            this.subscription_details.subscription_tokens[index].coupon_status = false;
            this.subscription_details.used_tokens = [];
          }
          res.coupon_status = true;

          // this.buttonCount = 1;
          // this.dcrsCount = this.subscription_details.subscription_tokens.length - 1;
          this.subscription_details.used_tokens.push(arg);
          // this.dcrsCount = Number(this.get_no_of_usage()) ;
          // this.buttonCount = Number(this.get_remaining_usage()) - Number(this.subscription_details.used_tokens[0].remaining_usages);
          // let percent = (Number(this.buttonCount) / Number(this.dcrsCount) * 100 )
          // let remain_percent = 100 - Number(percent) 
          // console.log(remain_percent)
          // this.elem.nativeElement.style.setProperty("--value", remain_percent);

          // this.elem.nativeElement.style.setProperty("--totalPercent", this.dcrsCount);
          
        } else {
          res.coupon_status = false;

          // this.buttonCount = Number(this.get_remaining_usage());
          // this.dcrsCount = Number(this.get_no_of_usage());

          // //this.elem.nativeElement.style.setProperty("--value", this.buttonCount);
          // //this.elem.nativeElement.style.setProperty("--totalPercent", this.dcrsCount);

          // let percent = (Number(this.buttonCount) / Number(this.dcrsCount) * 100 );
          // let remain_percent = 100 - Number(percent) ;
          // console.log(remain_percent);
          // this.elem.nativeElement.style.setProperty("--value", remain_percent);

          let index = this.subscription_details.used_tokens.findIndex((res) => res.uid == arg.uid);
          this.subscription_details.used_tokens.splice(index, 1);
        }
      }
    });
    
    
  }

  get_bags_subscription() {
    if(this.subscription_details.used_tokens.length !=0){
      if (this.bookingForm.controls["airline"].value) {
        switch (this.bookingForm.controls["transfer_type"].value) {
          // case "Local":
          //   if (this.bookingForm.controls["terminal"].value == "Domestic Travel") {
          //     if (Number(this.subscription_details.used_tokens[0].remaining_usages) != 0 && Number(this.subscription_details.used_tokens[0].remaining_usages) < 8) {
          //       let arr = [];
          //       for (let i = 1;i <=Math.floor(Number(this.subscription_details.used_tokens[0].remaining_usages));i++) {
          //         arr.push(i);
          //       }
          //       return arr;
          //     } 
          //     else if (Number(this.subscription_details.used_tokens[0].remaining_usages) >= 8) {
          //       return [1, 2, 3, 4, 5, 6, 7, 8];
          //     }
          //   } 
          //   else if (this.bookingForm.controls["terminal"].value =="International Travel" ) {
          //     if (Number(this.subscription_details.used_tokens[0].remaining_usages) > 1 && Number(this.subscription_details.used_tokens[0].remaining_usages) < 16) {
          //       let arr = [];
          //       for (let i = 1;i <= Math.floor(Number(this.subscription_details.used_tokens[0].remaining_usages) / 2); i++) {
          //         arr.push(i);
          //       }
          //       return arr;
          //     } 
          //     else if (Number(this.subscription_details.used_tokens[0].remaining_usages) >= 16 ) {
          //       return [1, 2, 3, 4, 5, 6, 7, 8];
          //     } 
          //     else {
          //       this.remove_bag_value();
          //       return [];
          //     }
          //   } else {
          //     this.remove_bag_value();
          //     return [];
          //   }
          //   break;
          // 
          case "Local":
            return [1, 2, 3, 4, 5, 6, 7, 8];
            break;
          case "Outstation":
            return [1, 2, 3, 4, 5, 6, 7, 8];
            break;
          default:
            this.remove_bag_value();
            return [];
            break;
        }
      } else {
        this.remove_bag_value();
        return [];
      }
    }else{
      this.remove_bag_value();
      return [];
    }
  }

  remove_bag_value() {
    this.bookingForm.controls["bags"].setValue("");
  }

  getSupscriptionPrice() {
    this.subscription_details.proceed_without_payment = false
    switch (this.bookingForm.controls["transfer_type"].value) {
      case "Local":
        if (this.subscription_details.used_tokens.length != 0 && this.bookingForm.controls["bags"].value && this.bookingForm.controls["terminal"].value) {
          // console.log("local price.      ", Number(this.bookingForm.controls["bags"].value) *(this.bookingForm.controls["terminal"].value == "Domestic Travel" ? 1 : 2) * Number(this.subscription_details.used_tokens[0].redemption_cost));
          // this.approximateAmount = Number(this.bookingForm.controls["bags"].value) * (this.bookingForm.controls["terminal"].value == "Domestic Travel"? 1 : 2) * Number(this.subscription_details.used_tokens[0].redemption_cost);
          // this.approximateAmount == 0 ? this.subscription_details.proceed_without_payment = true : null
          this.subscription_outstation_price();
        } else {
          this.approximateAmount = 0; 
        }
        break;
      case "Outstation":
        if (this.subscription_details.used_tokens.length != 0 && this.bookingForm.controls["bags"].value && this.bookingForm.controls["terminal"].value) {
          this.subscription_outstation_price();
        } else {
          this.approximateAmount = 0;
        }
        break;
    }
  }

  subscription_outstation_price() {
    this.remaining_usages = this.total_usages = '';
    this.subscription_details.proceed_without_payment = false
    this.approximateAmount = 0;
    const formValue = { ...this.bookingForm.value };
    // Request Body
    let amount = this.used_coupons = 0;
    const reqBody = {
      order_type: 2,
      transfer_type: 2,
      airport_name: formValue.airport_id,
      city_name: formValue.city_id,
      state_name: 0,
      excess_weight_purchased: "no",
      excess_weight: 0,
      bag_weight: 10,
      no_of_units: formValue.bags,
      pincode: Number(this.addressPincode),
      service_type: formValue.type == "Departure" ? 1 : 2,
    };

    // subscription price calulations
    if (this.bookingForm.controls["airline"].value) {
      this.crud
        .postWithCorporateTokenAirline(
          CORPORATE_APIS.GET_APPROX_AMOUNT_CALCULATION,
          reqBody,
          this.token,
          formValue.airline,
          formValue.transfer_type == "Outstation" ? 2 : 1
        )
        .pipe(throttleTime(250))
        .subscribe((data: any) => {
          this.priceDetailsRes = data;
          amount = Math.round(data.price_details.price_with_gst);

          // outstation convinence charge for subscription
          if (this.bookingForm.controls["transfer_type"].value == "Outstation") {
            for (var x = 0; x <= this.states.length - 1; x++) {
              // jammu and north east state
              if (this.stateName === this.states[x]) {
                this.convenienceCharge = data.conveyance_charge[8].total_price;
                this.luggageGst = data.conveyance_charge[8].gst_price;
                break;
              }

              // distance base calculation
              if (this.stateName !== this.states[x]) {
                if (this.distance <= 60) {
                  this.convenienceCharge =
                    data.conveyance_charge[0].total_price;
                  this.luggageGst = data.conveyance_charge[0].gst_price;
                } else if (this.distance <= 130) {
                  this.convenienceCharge =
                    data.conveyance_charge[1].total_price;
                  this.luggageGst = data.conveyance_charge[1].gst_price;
                } else if (this.distance <= 200) {
                  this.convenienceCharge =
                    data.conveyance_charge[2].total_price;
                  this.luggageGst = data.conveyance_charge[2].gst_price;
                } else if (this.distance <= 300) {
                  this.convenienceCharge =
                    data.conveyance_charge[3].total_price;
                  this.luggageGst = data.conveyance_charge[3].gst_price;
                } else if (this.distance <= 400) {
                  this.convenienceCharge =
                    data.conveyance_charge[4].total_price;
                  this.luggageGst = data.conveyance_charge[4].gst_price;
                } else if (this.distance <= 500) {
                  this.convenienceCharge =
                    data.conveyance_charge[5].total_price;
                  this.luggageGst = data.conveyance_charge[5].gst_price;
                } else if (this.distance > 500) {
                  this.convenienceCharge =
                    data.conveyance_charge[6].total_price;
                  this.luggageGst = data.conveyance_charge[6].gst_price;
                }
              }

              // serviceable city
              if (this.airport_city_name == this.bookingForm.controls['addressCity'].value){
                // same city
                if (this.distance <= 60) {
                  this.convenienceCharge =
                    data.conveyance_charge[0].total_price;
                  this.luggageGst = data.conveyance_charge[0].gst_price;
                } else if (this.distance <= 130) {
                  this.convenienceCharge =
                    data.conveyance_charge[1].total_price;
                  this.luggageGst = data.conveyance_charge[1].gst_price;
                } else if (this.distance <= 200) {
                  this.convenienceCharge =
                    data.conveyance_charge[2].total_price;
                  this.luggageGst = data.conveyance_charge[2].gst_price;
                } else if (this.distance <= 300) {
                  this.convenienceCharge =
                    data.conveyance_charge[3].total_price;
                  this.luggageGst = data.conveyance_charge[3].gst_price;
                } else if (this.distance <= 400) {
                  this.convenienceCharge =
                    data.conveyance_charge[4].total_price;
                  this.luggageGst = data.conveyance_charge[4].gst_price;
                } else if (this.distance <= 500) {
                  this.convenienceCharge =
                    data.conveyance_charge[5].total_price;
                  this.luggageGst = data.conveyance_charge[5].gst_price;
                } else if (this.distance > 500) {
                  this.convenienceCharge =
                    data.conveyance_charge[6].total_price;
                  this.luggageGst = data.conveyance_charge[6].gst_price;
                }
              }
              else {
                // other serviceable city
                for (var y = 0; y <= this.exsistingCityArray.length - 1; y++) {
                  if (this.cityName === this.exsistingCityArray[y]) {
                    this.convenienceCharge =
                      data.conveyance_charge[7].total_price;
                    this.luggageGst = data.conveyance_charge[7].gst_price;
                    break;
                  }
                }
              }
            }

            if (amount != 0 && this.subscription_details.used_tokens.length != 0) {
              let domestic_Or_International = this.bookingForm.controls["terminal"].value == "Domestic Travel" ? 1 : 2;
              console.log("domestic_Or_International.  ", domestic_Or_International);
               this.remaining_usages = Number(this.subscription_details.used_tokens[0].remaining_usages);
              //no of usages
              let gst_with_supscription_cost = Number(this.subscription_details.used_tokens[0].subscription_cost) + (Number(this.subscription_details.used_tokens[0].subscription_cost) /100) * Number(this.subscription_details.used_tokens[0].gst_percent);
              console.log("gst_with_supscription_cost.  .  ",gst_with_supscription_cost);
              
              let per_usage_cost = Math.round(Number(gst_with_supscription_cost) / Number(this.subscription_details.used_tokens[0].no_of_usages));
              console.log("one_usage.  ", per_usage_cost);
              console.log("this.convenienceCharge.  ", this.convenienceCharge);
              // total outstation usage
  
              // price amount for local and outstation
              let local_and_outstation_price = this.bookingForm.controls["transfer_type"].value == "Outstation" ? (Math.round(Number(this.convenienceCharge))) : Math.round(data.price_details.price_with_gst)
              console.log("local_and_outstation_price.          ",  local_and_outstation_price)
  
              let total_outstation_usage = Math.ceil(local_and_outstation_price / per_usage_cost);
              console.log("total_outstation_usage.  ", total_outstation_usage);
  
              // calculation start
              let bag = formValue.bags * domestic_Or_International;
              console.log("bag.  ", bag);
  
              let no_of_usages = total_outstation_usage * domestic_Or_International;
              console.log("no_of_usages.  ", no_of_usages);
              this.total_usages = no_of_usages + bag
              if(Number(this.subscription_details.used_tokens[0].remaining_usages) >= (no_of_usages + bag)){
                this.approximateAmount = 0;
                this.approximateAmount == 0 ? this.subscription_details.proceed_without_payment = true : null
                this.used_coupons = no_of_usages + bag
                this.subscription_gst_price = 0;
                // proceed to pay
              } else{
                this.used_coupons = Number(this.subscription_details.used_tokens[0].remaining_usages);
                this.subscription_gst_price = ((Number(this.subscription_details.used_tokens[0].remaining_usages) * Number(per_usage_cost)) * Number(this.subscription_details.used_tokens[0].gst_percent)) / 100;
                console.log('subscription_gst_price.      ',this.subscription_gst_price)
                let exast_useage = no_of_usages + bag - Number(this.subscription_details.used_tokens[0].remaining_usages);
                console.log("exast_useage.  ", exast_useage);
                this.approximateAmount = Math.round(Number(exast_useage) * Number(per_usage_cost));
                console.log("Math.round(Number(exast_useage) * Number(one_usage)).    ",Math.round(Number(exast_useage) * Number(per_usage_cost)));
              }
            }
          }
          else if (this.bookingForm.controls["transfer_type"].value == "Local"){
            let domestic_Or_International = this.bookingForm.controls["terminal"].value == "Domestic Travel" ? 1 : 2;
            console.log("domestic_Or_International.  ", domestic_Or_International);
            this.remaining_usages = Number(this.subscription_details.used_tokens[0].remaining_usages);
            //no of usages
            let gst_with_supscription_cost = Number(this.subscription_details.used_tokens[0].subscription_cost) + (Number(this.subscription_details.used_tokens[0].subscription_cost) /100) * Number(this.subscription_details.used_tokens[0].gst_percent);
            console.log("gst_with_supscription_cost.  .  ",gst_with_supscription_cost);
            
            let per_usage_cost = Math.round(Number(gst_with_supscription_cost) / Number(this.subscription_details.used_tokens[0].no_of_usages));
            console.log("one_usage.  ", per_usage_cost);

            // redemption_cost
            let redemption_cost = Number(this.subscription_details.used_tokens[0].redemption_cost);
            redemption_cost = Number(redemption_cost) + Math.round(Number(redemption_cost) * Number(this.subscription_details.used_tokens[0].gst_percent) /100 );
            // redemption_cost = domestic_Or_International * redemption_cost;
            console.log('redemption_cost',redemption_cost)
            this.total_usages = (Number(formValue.bags) * domestic_Or_International)
            if(Number(this.subscription_details.used_tokens[0].remaining_usages) < (Number(formValue.bags) * domestic_Or_International )){
              console.log('priceing')

              let remaining_local_usage = (domestic_Or_International * Number(formValue.bags)) - Number(this.subscription_details.used_tokens[0].remaining_usages)

              let price = Math.round(Number(per_usage_cost) * Number(remaining_local_usage));
              // this.approximateAmount = Math.round(Number(price) + (Number(this.bookingForm.controls["bags"].value) * Number(redemption_cost)))
              this.approximateAmount = Math.round(Number(price) + ( Number(this.subscription_details.used_tokens[0].remaining_usages) * Number(redemption_cost)))
              this.approximateAmount == 0 ? this.subscription_details.proceed_without_payment = true : null

              console.log('priceing',this.approximateAmount)

              this.used_coupons = Number(this.subscription_details.used_tokens[0].remaining_usages) ;
              this.subscription_gst_price = (Number(this.approximateAmount) *  Number(this.subscription_details.used_tokens[0].gst_percent)) / 100;
             
            }
            else{
              this.used_coupons = Number(formValue.bags) * Number(domestic_Or_International);
              this.subscription_gst_price = 0;
              this.approximateAmount = Math.round(domestic_Or_International * (Number(this.bookingForm.controls["bags"].value) * Number(redemption_cost)))
              // this.approximateAmount = Math.round(Number(this.bookingForm.controls["bags"].value) * Number(redemption_cost))
              // this.approximateAmount = Number(this.bookingForm.controls["bags"].value) * (this.bookingForm.controls["terminal"].value == "Domestic Travel"? 1 : 2) * Number(this.subscription_details.used_tokens[0].redemption_cost);

              console.log(this.approximateAmount,'-------edwed-wed-');
              this.approximateAmount == 0 ? this.subscription_details.proceed_without_payment = true : null
            }
          }
          
          
        });
    }
  }

  // place subscription order
  place_subscription_order(){
    this.submitted = true;
    if (this.bookingForm.valid) {
      if (this.bookingForm.controls["term"].value != false) {

        if(this.subscription_details.used_tokens.length != 0){ 
          
          this.ngxSpinner.show();
          // request body
          const formValue = { ...this.bookingForm.value };

          const reqBody = {
            service_type: formValue.type == "Departure" ? 1 : 2, // 2 for arrival, //1 for departure
            order_type: 2,
            transfer_type: formValue.transfer_type == 'Local' ? 1:2,
            dservice_type: 7, // not confirmed
            order_type_str: formValue.delivery_type == "Airport Transfer" ? "Airport Transfer" : "Lost Luggage",
            terminal_type: formValue.terminal == "Domestic Travel" ? 2 : 1,
            pick_drop_point: formValue.delivery_type == "Airport Transfer" ? (formValue.pickup_type == "Airport: Drop off Point" || formValue.pickup_type == "Airport: Pickup Point" ? 1 : 2 ) : 2,
            no_of_units: Number(formValue.bags),
            travell_passenger_name : formValue.name,
            travell_passenger_contact : formValue.mobile_number,
            travell_passenger_email : formValue.email,
            country_code: formValue.country,
            subscription_transaction_id : this.subscription_details.used_tokens[0].subscription_transaction_id, // subscripion confirmation number -------
            order_date: this.datePipe.transform(formValue.date, "dd MMM y"),
            extra_weight_purched : "no",
            // formValue.transfer_type == 'Local' ? Number(formValue.bags) :
            exhaust_usages: Number(this.used_coupons) , // subscripion exhaust_usages -------
            payment_type : this.approximateAmount != 0 ? "razorpay" : "prepaid",
            corporate_type : 4,
            service_tax_amount :  Number(this.subscription_gst_price) ,  // subscripion service_tax_amount -------
            luggage_price : Number(this.approximateAmount) ,  // subscripion luggage_price -------
            total_luggage_price : this.approximateAmount,   //subscripion total_luggage_price
            airport_id: formValue.airport_id,
            city_id: formValue.city_id,
            flight_number: formValue.other_airline_no && formValue.other_airline_no != "none"? formValue.other_airline_no.toUpperCase() : "",
            pnr_number: formValue.pnr.toUpperCase(),
            airport_slot_time :  (this.meetHour < 10  ? '0' : '' ) + this.meetHour + ':' + this.meetMin + (this.meetMin < 10  ? '0' : ''),  // airport_slot_time
            pick_drop_address: this.pick_drop_details.length != 0 && (formValue.pickup_type == "Airport: Drop off Point" || formValue.pickup_type == "Airport: Pickup Point") ? Number(this.pick_drop_details[0].pick_drop_id) : null,
            fk_tbl_order_id_slot : formValue.time_slot && formValue.time_slot != "none" ? formValue.time_slot : 1,
            // formValue.pickup_type == "Airport: Drop off Point" || formValue.pickup_type == "Airport: Pickup Point" ? formValue.pincode : (formValue.delivery_type == "Airport Transfer" ? '' : 
            pincode_first : (this.addressPincode ? this.addressPincode : formValue.pincode) ,
            pincode_second : '',
            address_line_1: this.fullAddressLine,
            address_line_2: "",
            area: this.area,
            pincode: formValue.delivery_type == "Airport Transfer" ? (formValue.pickup_type == "Airport: Drop off Point" || formValue.pickup_type == "Airport: Pickup Point" ? formValue.pincode : this.addressPincode) : formValue.addressPincodes,
            building_number : '',
            building_restriction: null, 
            remaining_usages: this.remaining_usages,
            total_usages: this.total_usages,
            delivery_datetime: this.delivery_date
              ? this.delivery_date.toString().split(" ")[2] +
              " " +
              this.delivery_date.toString().split(" ")[1] +
              " " +
              this.delivery_date.toString().split(" ")[3] +
              " " +
              this.show_delivery_time.toString().split(" ")[0]
              : this.selected_date_for_date_picker,
              
          };

          console.log(reqBody, 'request body for redeem and booking');
          // REEDEME AND BOOOKING API
          this.crud.postWithStaticTokenAirline( CORPORATE_APIS.REDEEMBOOKING, reqBody, this.token, formValue.airline, formValue.transfer_type == "Outstation" ? 2 : 1).pipe(throttleTime(250)).subscribe((data: any) => {
          if (data.status) {
            console.log(data, 'api response for redeem and booking')
            localStorage.setItem("order", JSON.stringify([data.order_number]));
            localStorage.setItem("order_from", "airport");
            this.ngxSpinner.hide();
            this.router.navigate(["/order-confirmation"]);
            window.scrollTo(0, 0);
          }
        },
        () => this.ngxSpinner.hide()
          );
        } else {
          this.printToastMsg("Please use Subscription to booking");
          console.log("--------", this.bookingForm);
        }
        
      } else {
        this.printToastMsg("Please agree the terms and condition");
        console.log("--------", this.bookingForm);
      }
    } else {
      this.printToastMsg("Please fill in all the highlighted fields");
      console.log("--------", this.bookingForm);
    }
  }

  // get all remaining usage
  get_remaining_usage(){
    let total = 0;
    this.subscription_details.subscription_tokens.map((res)=>{
      // console.log(res);
      total = total + Number(res.remaining_usages);
    })
    // console.log(total,'----------')
    return total;
  }
  // get all no of usage
  get_no_of_usage(){
    let total = 0;
    this.subscription_details.subscription_tokens.map((res)=>{
      // console.log(res);
      total = total + Number(res.no_of_usages);
    })
    // console.log(total,'----------')
    return total;
  }

  

}

// abc
