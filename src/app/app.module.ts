import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeCitywiseCostService } from './core/services/home-citywise-cost/home-citywise-cost.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InfoDialogDirective } from './shared/directives/info-dialog.directive';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { InterceptService } from './core/services/intercept.service';
import { LuggageGuideComponent } from './shared/modals/luggage-guide/luggage-guide.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SearchPipe } from './shared/pipes/search.pipe';
import { ConfirmModalComponent } from './shared/modals/confirm-modal/confirm-modal.component';
import { MomentModule } from 'ngx-moment';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GooglePlaceModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    NgxLoadingModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    })
  ],
   providers: [ HomeCitywiseCostService, DatePipe,  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
