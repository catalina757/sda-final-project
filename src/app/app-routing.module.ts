import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PatientDashboardComponent} from './dashboard/patient-dashboard/patient-dashboard.component';
import {ClinicDashboardComponent} from './dashboard/clinic-dashboard/clinic-dashboard.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard',
    component: DashboardComponent,
    children: [
        { path:'patient-dash', component: PatientDashboardComponent },
        { path: 'clinic-dash', component: ClinicDashboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
