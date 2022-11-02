import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../shared/modals/login/login.component';
import { RegisterComponent } from '../shared/modals/register/register.component';

const routes: Routes = [

//  {   path: 'login',   component: LoginComponent   },
  {   path: 'register',   component: RegisterComponent   }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModuleModule { }
