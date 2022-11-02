import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/pages/homepage/home/home.component';
import { LoginComponent } from './shared/modals/login/login.component';
import { RegisterComponent } from './shared/modals/register/register.component';
import { VerifyOtpComponent } from './shared/modals/verify-otp/verify-otp.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {   path: 'home',   component: HomeComponent   },
  {   path: 'login',   component: LoginComponent   },
  {   path: 'register',   component: RegisterComponent   },
  {   path: 'verifyotp',   component: VerifyOtpComponent   },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
