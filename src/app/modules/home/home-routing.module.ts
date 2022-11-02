import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AboutUsComponent } from "./pages/about-us/about-us.component";
import { RateCardComponent } from "./pages/rate-card/rate-card.component";
import { CancellationAndRefundComponent } from "./pages/information/faq/cancellation-and-refund/cancellation-and-refund.component";
import { FaqComponent } from "./pages/information/faq/faq/faq.component";
import { PrivacyPolicyComponent } from "./pages/information/faq/privacy-policy/privacy-policy.component";
import { TermsAndConditionsComponent } from "./pages/information/faq/terms-and-conditions/terms-and-conditions.component";
import { FeedbackComponent } from "./pages/feedback/feedback.component";
import { ContactusComponent } from "./pages/contactus/contactus.component";
import { NewConfirmationPageComponent } from "./pages/homepage/home-details/new-confirmation-page/new-confirmation-page.component";
import { ArrivalDetailsComponent } from "./pages/information/arrival-details/arrival-details.component";
import { DepartureDetailsComponent } from "./pages/information/departure-details/departure-details.component";
import { NewAirportMobileComponent } from "./pages/homepage/home-details/new-airport-mobile/new-airport-mobile.component";
import { NewHowitsworkMobileComponent } from "./pages/homepage/home-details/new-howitswork-mobile/new-howitswork-mobile.component";
import { NewLocateusMobileComponent } from "./pages/homepage/home-details/new-locateus-mobile/new-locateus-mobile.component";
import { NewSaftyFirstMobileComponent } from "./pages/homepage/home-details/new-safty-first-mobile/new-safty-first-mobile.component";
import { InterterminalTransferConfirmationComponent } from "./pages/homepage/home-details/interterminal-transfer-confirmation/interterminal-transfer-confirmation.component";
import { CargoTransferMobileComponent } from "./pages/homepage/home-details/cargo-transfer-mobile/cargo-transfer-mobile.component";
import { CargoTransferBookingInfoComponent } from "./pages/information/cargo-transfer-booking-info/cargo-transfer-booking-info.component";
import { CargoCancellationAndRefundComponent } from "./pages/information/cargo-cancellation-and-refund/cargo-cancellation-and-refund.component";
import { CargoTransferTermsAndConditionComponent } from "./pages/homepage/home-details/cargo-transfer-terms-and-condition/cargo-transfer-terms-and-condition.component";
import { OrderConfirmComponent } from "./components/order-confirm/order-confirm.component";
import { MyTripComponent } from "./components/my-trip/my-trip.component";
import { SubscriptionConfirmationComponent } from "./components/subscription-confirmation/subscription-confirmation.component";

const routes: Routes = [
  { path: "about-us", component: AboutUsComponent },
  { path: "ratecard", component: RateCardComponent },
  { path: "feedback", component: FeedbackComponent },
  { path: "contact-us", component: ContactusComponent },
  {
    path: "booking-confirmation-page",
    component: NewConfirmationPageComponent,
  },
  { path: "airport-booking", component: NewAirportMobileComponent },
  { path: "cargo-transfer", component: CargoTransferMobileComponent },
  {
    path: "order-confirmation-page",
    component: InterterminalTransferConfirmationComponent,
  },

  {
    path: "information",
    redirectTo: "information/faq",
    pathMatch: "full",
  },
  { path: "information/faq", component: FaqComponent },
  {
    path: "information/cancellation-and-refund",
    component: CancellationAndRefundComponent,
  },
  { path: "information/privacy-policy", component: PrivacyPolicyComponent },
  {
    path: "information/terms-and-conditions",
    component: TermsAndConditionsComponent,
  },

  { path: "information/arrival-details", component: ArrivalDetailsComponent },
  {
    path: "information/departure-details",
    component: DepartureDetailsComponent,
  },
  { path: "how-its-work", component: NewHowitsworkMobileComponent },
  { path: "locate-us", component: NewLocateusMobileComponent },
  { path: "safty-first", component: NewSaftyFirstMobileComponent },
  {
    path: "cargo/booking-information",
    component: CargoTransferBookingInfoComponent,
  },
  {
    path: "cargo/cancellation-and-refund-policy",
    component: CargoCancellationAndRefundComponent,
  },
  {
    path: "cargo/terms-and-conditions",
    component: CargoTransferTermsAndConditionComponent,
  },
  { path: "order-confirmation", component: OrderConfirmComponent },
  { path: "my-trips", component: MyTripComponent },
  {
    path: "subscription-confirmation",
    component: SubscriptionConfirmationComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
