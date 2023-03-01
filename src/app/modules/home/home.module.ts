import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./pages/homepage/home/home.component";
import { HeaderComponent } from "src/app/core/header/header.component";
import { FooterComponent } from "src/app/core/footer/footer.component";
import { HomeCitywiseCostComponent } from "./pages/homepage/home-citywise-cost/home-citywise-cost.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule, NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { UserInputDetailsComponent } from "./pages/homepage/home-details/user-input-details/user-input-details.component";
import { HomeRoutingModule } from "./home-routing.module";
import { AboutUsComponent } from "./pages/about-us/about-us.component";
import { RateCardComponent } from "./pages/rate-card/rate-card.component";
import { LoginComponent } from "src/app/shared/modals/login/login.component";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from "@angular/material/dialog";
import { MatAutocompleteModule, MatButtonModule, MatDialogModule, MatStepperModule } from "@angular/material";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { RegisterComponent } from "src/app/shared/modals/register/register.component";
import { VerifyOtpComponent } from "src/app/shared/modals/verify-otp/verify-otp.component";
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";
import { CancellationAndRefundComponent } from "./pages/information/faq/cancellation-and-refund/cancellation-and-refund.component";
import { PopUpComponent } from "src/app/shared/modals/pop-up/pop-up.component";
import { FaqComponent } from "./pages/information/faq/faq/faq.component";
import { PrivacyPolicyComponent } from "./pages/information/faq/privacy-policy/privacy-policy.component";
import { TermsAndConditionsComponent } from "./pages/information/faq/terms-and-conditions/terms-and-conditions.component";
import { InfoDialogDirective } from "src/app/shared/directives/info-dialog.directive";
import { CorporateHeaderComponent } from "src/app/core/corporate-header/corporate-header.component";
import { CorporateFooterComponent } from "src/app/core/corporate-footer/corporate-footer.component";
import { CorporateDepartureComponent } from "./pages/homepage/home-details/corporate-departure/corporate-departure.component";
import { CorporateArrivalComponent } from "./pages/homepage/home-details/corporate-arrival/corporate-arrival.component";
import { LuggageGuideComponent } from "src/app/shared/modals/luggage-guide/luggage-guide.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxYoutubePlayerModule } from "ngx-youtube-player";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NumberDirective } from "../../shared/directives/number.directive";
import { TimeformatPipe } from "../../shared/pipes/timeformat.pipe";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { Ng2LoadingSpinnerModule } from "ng2-loading-spinner";
import { Ng4LoadingSpinnerModule } from "ng4-loading-spinner";
import { FaqContentComponent } from "./pages/information/faq/faq/components/faq-content/faq-content.component";
import { MatFormFieldModule, MatSelectModule } from "@angular/material";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { ConfirmModalComponent } from "src/app/shared/modals/confirm-modal/confirm-modal.component";
import { SearchPipe } from "src/app/shared/pipes/search.pipe";
import { FilterArrayPipe } from "src/app/shared/pipes/filter-array.pipe";
import { FeedbackComponent } from "./pages/feedback/feedback.component";
import { ContactusComponent } from "./pages/contactus/contactus.component";
import { SaftyFirstComponent } from "./pages/homepage/safty-first/safty-first.component";
import { LocateUsAirportComponent } from "./pages/homepage/home-details/locate-us-airport/locate-us-airport.component";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { NewConfirmationPageComponent } from "./pages/homepage/home-details/new-confirmation-page/new-confirmation-page.component";
import { ArrivalDetailsComponent } from "./pages/information/arrival-details/arrival-details.component";
import { NewAirportTransferComponent } from "./pages/homepage/home-details/new-airport-transfer/new-airport-transfer.component";
import { DepartureDetailsComponent } from "./pages/information/departure-details/departure-details.component";
import { NewHomeMobileComponent } from "./pages/homepage/home-details/new-home-mobile/new-home-mobile.component";
import { NewAirportMobileComponent } from "./pages/homepage/home-details/new-airport-mobile/new-airport-mobile.component";
import { NewHowitsworkMobileComponent } from "./pages/homepage/home-details/new-howitswork-mobile/new-howitswork-mobile.component";
import { NewLocateusMobileComponent } from "./pages/homepage/home-details/new-locateus-mobile/new-locateus-mobile.component";
import { NewSaftyFirstMobileComponent } from "./pages/homepage/home-details/new-safty-first-mobile/new-safty-first-mobile.component";
import { InterterminalTransferConfirmationComponent } from "./pages/homepage/home-details/interterminal-transfer-confirmation/interterminal-transfer-confirmation.component";
import { CargoTransferComponent } from "./pages/homepage/home-details/cargo-transfer/cargo-transfer.component";
import { CargoTransferMobileComponent } from "./pages/homepage/home-details/cargo-transfer-mobile/cargo-transfer-mobile.component";
import { CargoCancellationAndRefundComponent } from "./pages/information/cargo-cancellation-and-refund/cargo-cancellation-and-refund.component";
import { CargoTransferTermsAndConditionComponent } from "./pages/homepage/home-details/cargo-transfer-terms-and-condition/cargo-transfer-terms-and-condition.component";
import { CargoTransferBookingInfoComponent } from "./pages/information/cargo-transfer-booking-info/cargo-transfer-booking-info.component";
import { BookingComponent } from "./components/booking/booking.component";
import { PartnerComponent } from "./components/partner/partner.component";
import { OrderConfirmComponent } from "./components/order-confirm/order-confirm.component";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { MyTripComponent } from "./components/my-trip/my-trip.component";
import { HomeStaticBlockComponent } from "./components/home-static-block/home-static-block.component";
import { SubscriptionComponent } from "./components/subscription/subscription.component";
import { BuySubscriptionComponent } from "./components/buy-subscription/buy-subscription.component";
import { SubscriptionConfirmationComponent } from "./components/subscription-confirmation/subscription-confirmation.component";
import { HelpAssistanceComponent } from "./components/track-order/help-assistance/help-assistance.component";
import { OrderDetailsComponent } from "./components/track-order/order-details/order-details.component";
import { HelpDetailsComponent } from "./components/track-order/help-details/help-details.component";
import { HelpDetailsContentComponent } from "./components/track-order/help-details-content/help-details-content.component";
import { OrderStatusComponent } from "./components/track-order/order-status/order-status.component";
@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    HomeCitywiseCostComponent,
    UserInputDetailsComponent,
    AboutUsComponent,
    RateCardComponent,
    LoginComponent,
    RegisterComponent,
    VerifyOtpComponent,
    CancellationAndRefundComponent,
    PopUpComponent,
    FaqComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    ConfirmModalComponent,

    //directives
    InfoDialogDirective,
    NumberDirective,

    // pipes
    TimeformatPipe,
    SearchPipe,
    FilterArrayPipe,

    CorporateHeaderComponent,
    CorporateFooterComponent,
    CorporateDepartureComponent,
    CorporateArrivalComponent,
    LuggageGuideComponent,
    FaqContentComponent,
    FeedbackComponent,
    ContactusComponent,
    SaftyFirstComponent,
    LocateUsAirportComponent,
    NewConfirmationPageComponent,
    ArrivalDetailsComponent,
    NewAirportTransferComponent,
    DepartureDetailsComponent,
    NewHomeMobileComponent,
    NewAirportMobileComponent,
    NewHowitsworkMobileComponent,
    NewLocateusMobileComponent,
    NewSaftyFirstMobileComponent,
    InterterminalTransferConfirmationComponent,
    CargoTransferComponent,
    CargoTransferMobileComponent,
    CargoCancellationAndRefundComponent,
    CargoTransferTermsAndConditionComponent,
    CargoTransferBookingInfoComponent,
    BookingComponent,
    PartnerComponent,
    OrderConfirmComponent,
    MyTripComponent,
    HomeStaticBlockComponent,
    SubscriptionComponent,
    BuySubscriptionComponent,
    SubscriptionConfirmationComponent,
    HelpAssistanceComponent,
    OrderDetailsComponent,
    HelpDetailsComponent,
    HelpDetailsContentComponent,
    OrderStatusComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    FormsModule,
    HomeRoutingModule,
    MatDialogModule,
    NgxSpinnerModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    NgxLoadingModule.forRoot({}),
    NgxYoutubePlayerModule.forRoot(),
    Ng2LoadingSpinnerModule.forRoot({}),
    Ng4LoadingSpinnerModule.forRoot(),
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxMatSelectSearchModule,
    OwlNativeDateTimeModule,
    OwlDateTimeModule,
    GooglePlaceModule,
    MatStepperModule,
    MatButtonModule,
    MatAutocompleteModule,
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  entryComponents: [
    LoginComponent,
    PopUpComponent,
    LuggageGuideComponent,
    ConfirmModalComponent,
    BuySubscriptionComponent,
    HelpAssistanceComponent,
    OrderDetailsComponent,
    OrderStatusComponent,
  ],
})
export class HomeModule {}
