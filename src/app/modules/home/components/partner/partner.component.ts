import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-partner",
  templateUrl: "./partner.component.html",
  styleUrls: ["./partner.component.scss"],
})
export class PartnerComponent implements OnInit {
  partner_airports: any = [
    {
      name: "adani",
      path: "/assets/images/partnerAirport/adani.png",
      redirect_url: "",
    },
    {
      name: "",
      path: "/assets/images/partnerAirport/sivajiAirport.png",
      redirect_url: "",
    },
    {
      name: "",
      path: "/assets/images/partnerAirport/kempegowda.png",
      redirect_url: "",
    },
    {
      name: "hydrabad",
      path: "/assets/images/partnerAirport/hydrabad.png",
      redirect_url: "",
    },
    {
      name: "Gmr",
      path: "/assets/images/partnerAirport/gmr.png",
      redirect_url: "",
    },
    {
      name: "delhi",
      path: "/assets/images/partnerAirport/delhi.png",
      redirect_url: "",
    },
  ];
  partner_airlines: any = [
    {
      name: "Flyporter",
      path: "/assets/images/partnerAirlines/Flyporter_vector.svg",
      production_url: "https://flyporter.carterporter.in/home",
      qa_url: "https://dev-flyporter.carterporter.in/home",
    },
    {
      name: "indigo",
      path: "/assets/images/partnerAirlines/indigo-logo.svg",
      production_url: "https://www.6ebagport.carterporter.in/",
      qa_url: "https://dev-indigo.carterporter.in/",
    },
    {
      name: "akasa",
      path: "/assets/images/partnerAirlines/akasa-logo.png",
      production_url: "https://akasaair.carterx.in/",
      qa_url: "https://dev-akasa.carterporter.in/",
    },
    {
      name: "spicejet",
      path: "/assets/images/partnerAirlines/spicejetLogo.webp",
      production_url: "https://www.spicejet.carterx.in/",
      qa_url: "https://dev-spiceluggageport.carterporter.in/",
    },
    {
      name: "Vistara",
      path: "/assets/images/partnerAirlines/Vistara_Vistara.svg",
      production_url: "https://www.vistaragatetogate.carterx.in/home",
      qa_url: "https://dev-vistara.carterporter.in/home",
    },
  ];

  environment_local: any;

  constructor() {
    this.environment_local = environment;
  }

  ngOnInit() {}
}
