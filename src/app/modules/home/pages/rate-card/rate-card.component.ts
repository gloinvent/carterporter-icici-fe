import { Component, OnInit } from "@angular/core";
import { LuggageGuideComponent } from "../../../../shared/modals/luggage-guide/luggage-guide.component";
import { PickAirportService } from "../../../../core/services/pick-airport/pick-airport.service";
import { apis } from "../../../../config/apis";
import { CrudService } from "../../../../core/services/crud.service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";

import { MatDialog } from "@angular/material";
@Component({
  selector: "app-rate-card",
  templateUrl: "./rate-card.component.html",
  styleUrls: ["./rate-card.component.scss"],
})
export class RateCardComponent implements OnInit {
  airportdata: any;
  airportnames: any;
  city: any;
  luggageArray: any;

  // subscription
  subscription: any = [
    {
      type: "Prestige",
      airline: "Other & Partner Airlines",
      price: "INR 1950",
      no_of_usage: "4 Usage",
    },
    {
      type: "Prestige+",
      airline: "Other & Partner Airlines",
      price: "INR 3799",
      no_of_usage: "8 Usage",
    },
  ];

  // local
  local: any = {
    // purchase details
    purchase: [
      {
        type: "Other Airlines",
        one_bag: "INR 699",
        subsequent_bag: "INR 699",
        distance_from_airport: "For Up to 75 Kms",
        express_service: "INR 900",
      },
      {
        type: "Partner Airlines",
        one_bag: "INR 600 - 700",
        subsequent_bag: "INR 600 - 700",
        distance_from_airport: "For Up to 75 Kms",
        express_service: "INR 900",
      },
    ],

    // Subscription title
    subscription_title: {
      title:
        "76 - above 500 Kms. Rates of the distance will be deducted from the value of the subscription and bags will be of usage value",
    },

    // Subscription Details
    subscription_list: [
      {
        type: "Domestic Departure/Arrival",
        one_bag: "1 Bag = 1 Usage",
        subsequent_bag: "Each Bag will be deducted against 1 Usage",
        distance_from_airport: "For Up to 75 Kms",
        refund: "Usages and value will be credited back",
      },
      {
        type: "International Departure/Arrival",
        one_bag: "1 Bag = 2 Usage",
        subsequent_bag: "Each Bag will be deducted against 2 Usage",
        distance_from_airport: "For Up to 75 Kms",
        refund: "Usages and value will be credited back",
      },
    ],

    // terms
    terms: [
      "Airport services include from dropoff to complete assistance to checkin counters and baggage belts at the airport",
      "Pick up based on slots for service from doorstep to airport. Departure is all the way to check-in counters",
      "Delivery timelines based on arrival of flight. Assistance from baggage belts. For any arrival before 3pm , delivery on the same day. For any arrivals after 3pm, delivery is next day before 2pm",
      "All packages will be inspected before order is picked. Maximum charge from an order of INR 300 will be withheld before refund if puck up is not completed after inspection.",
    ],

    // order modification
    order_modification: [
      "All TVs and Other Electronic or oversized items will be charged at an extra cost of INR 450 per Kg as Order Modicication. Order modification should be paid before delivery. Order modification can be for additional luggage and removal of luggage as well. Any refunds will be made to source account.",
    ],

    // order modificationMaximum Size for CarterX carriage
    max_ize_for_carterx: [
      "32 Kgs and 70 Linear inches. Partner Airlines may have other rules.",
    ],

    // GST
    gst: ["All rates are exclusive of GST of 12%"],
  };

  // outstation
  outstation: any = {
    // purchase details
    purchase: [
      {
        type: "Other & Partner Airlines",
        one_bag: "INR 1250 - 2250",
        subsequent_bag: "INR 599",
        distance_from_airport: "For Up to 76 - 150 Kms",
        pickup_delivery: "4 - 7 Days ",
        refund: "",
      },
      {
        type: "Other & Partner Airlines",
        one_bag: "INR 2850 - 3850",
        subsequent_bag: "INR 599",
        distance_from_airport: "For Up to 151 - 300 Kms",
        pickup_delivery: "4 - 7 Days ",
        refund: "",
      },
      {
        type: "Other & Partner Airlines",
        one_bag: "INR 3850 - 4850",
        subsequent_bag: "INR 599",
        distance_from_airport: "For Up to 301 - 500 Kms",
        pickup_delivery: "4 - 7 Days ",
        refund: "",
      },
      {
        type: "Other & Partner Airlines",
        one_bag: "INR 5000",
        subsequent_bag: "INR 599",
        distance_from_airport: "Above 500 Kms",
        pickup_delivery: "5 - 8 Days ",
        refund: "",
      },
    ],

    // Subscription title
    subscription_title: [
      "76 - above 500 Kms. Rates of the distance will be deducted from the value of the subscription and bags will be of usage value",
    ],

    // Subscription Details
    subscription_list: [
      {
        type: "Domestic Departure/Arrival",
        one_bag: "1 Bag = 1 Usage",
        subsequent_bag: "Each Bag will be deducted against 1 Usage",
        pickup_delivery: "",
        refund: "Usages and value will be credited back",
      },
      {
        type: "International Departure/Arrival",
        one_bag: "1 Bag = 2 Usage",
        subsequent_bag: "Each Bag will be deducted against 2 Usage",
        pickup_delivery: "",
        refund: "Usages and value will be credited back",
      },
    ],

    // terms
    terms: [
      "Airport services include from dropoff to complete assistance to checkin counters and baggage belts at the airport",
      "Pick up based on slots for service from doorstep to airport. Departure is all the way to check-in counters",
      "Delivery timelines based on arrival of flight. Assistance from baggage belts. For any arrival before 3pm , delivery on the same day. For any arrivals after 3pm, delivery is next day before 2pm",
    ],

    // order modification
    order_modification: [
      "All TVs and Other Electronic or oversized items will be charged at an extra cost of INR 450 per Kg as Order Modicication. Order modification should be paid before delivery. Order modification can be for additional luggage and removal of luggage as well. Any refunds will be made to source account.",
      "All packages will be inspected before order is picked. Maximum charge from an order of INR 1000 will be withheld before refund if puck up is not completed after inspection.",
    ],

    // order modificationMaximum Size for CarterX carriage
    max_ize_for_carterx: [
      "32 Kgs and 70 Linear inches. Partner Airlines may have other rules.",
    ],

    // GST
    gst: ["All rates are exclusive of GST of 12%"],
  };

  //cargo
  cargo: any = {
    cargo_list: [
      {
        type: "Domestic Cargo - Surface, 4-7 Days Delivery",
        per_kg: "INR 100",
        handling_cost: "INR 200",
        local_pick_up: "INR 300",
        local_delivery: "INR 300 ",
      },
      {
        type: "Domestic Cargo - Air, Up to 4 days to delivery",
        per_kg: "INR 250",
        handling_cost: "INR 400",
        local_pick_up: "INR 300",
        local_delivery: "INR 300 ",
      },
      {
        type: "Domestic Cargo - Air Express, Delivery in 48 hours",
        per_kg: "INR 450",
        handling_cost: "INR 400",
        local_pick_up: "INR 300",
        local_delivery: "INR 300 ",
      },
    ],
    terms: [
      "No packing material will be provided. ",
      "All packages will be inspected before order is picked. Maximum charge from an order of INR 300 will be withheld before refund if puck up is not completed after inspection.",
    ],
    gst: ["All rates are exclusive of GST of 12%"],
    order_modification: [
      "All TVs and Other Electronic or oversized items will be charged at an extra cost of INR 450 per Kg as Order Modicication. They should be in original packing. Order modification should be paid before delivery. Order modification can be for additional luggage and removal of luggage as well. Any refunds will be made to source account.",
    ],
    max_size_carterx: [
      "32 Kgs and 70 Linear inches. Air cargo and Air Express may have other rules on weight and carriage",
    ],
  };

  constructor(
    private dialog: MatDialog,
    private pickAirport: PickAirportService,
    private crud: CrudService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    this.getAirport();
  }

  receiveMessage($event) {
    this.luggageArray = $event;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LuggageGuideComponent, {
      width: "800px",
      panelClass: "custom-dialog-container",
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      // this.animal = result;
    });
  }

  // Loading airports
  airportId: any;
  data: any;
  getAirport() {
    this.spinnerService.show();
    this.pickAirport.getAirport(apis.GET_CITY).subscribe((data) => {
      this.airportdata = data;
      this.airportnames = this.airportdata.response.airport;
      console.log("this.airportnames", this.airportnames);
      this.city = this.airportdata.response.region;
      console.log("city", this.city);
      for (let i = 0; i < this.city.length; i++) {
        if (this.city[i].region_id == 1) {
          this.regionId = this.city[i].region_id;
          console.log("this.regionId", this.regionId);
          this.selectedCity = this.city[i].region_name;
          this.getLuggageDetails(this.city[i].region_id);
          this.spinnerService.hide();
        }
      }
    });
  }

  avtiveTab: any = "local";
  setFlag(value) {
    this.avtiveTab = value;
  }

  showDropdownList: boolean = false;
  showHideDropDownList() {
    this.showDropdownList = !this.showDropdownList;
  }

  selectedCity: any;
  regionId: any;
  setCity(city, id) {
    this.selectedCity = city;
    this.getLuggageDetails(id);
    this.regionId = id;
    console.log("this.regionId", this.regionId);
    this.showDropdownList = false;
  }

  getLuggageDetails(regionId) {
    this.spinnerService.show();
    let airportId;
    for (let i = 0; i < this.airportnames.length; i++) {
      if (this.airportnames[i].fk_tbl_city_of_operation_region_id == regionId) {
        console.log("here");
        airportId = this.airportnames[i].airport_name_id;
        const obj = {
          airport_id: airportId,
        };
        this.crud.post(apis.GET_LUGGAGE_TYPE, obj).subscribe((res) => {
          console.log("baggage-cost", res["luggage_types"]);
          this.data = res["luggage_types"];
          this.spinnerService.hide();
        });
        break;
      }
    }
  }
}
