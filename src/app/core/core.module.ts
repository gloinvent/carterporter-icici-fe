import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreRoutingModuleModule } from './core-routing-module.module';
import { LoginComponent } from '../shared/modals/login/login.component';
import { CorporateHeaderComponent } from './corporate-header/corporate-header.component';
import { CorporateFooterComponent } from './corporate-footer/corporate-footer.component';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecondHeaderComponent } from './second-header/second-header.component';

@NgModule({
  declarations: [ LoginComponent, SecondHeaderComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreRoutingModuleModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule
  ],
  exports: [ HeaderComponent, FooterComponent, CorporateHeaderComponent, CorporateFooterComponent ]
})
export class CoreModule { }
