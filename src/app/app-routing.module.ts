import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent} from './home/home.component';
import {SpecialitiesComponent} from './specialities/specialities.component';
import {ClinicsComponent} from './clinics/clinics.component';
import {PatientsComponent} from './patients/patients.component';
import {AppointmentListComponent} from './appointment/appointment-list/appointment-list.component';
import {AppointmentBookComponent} from './appointment/appointment-book/appointment-book.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/appointments', component: AppointmentListComponent},
  { path: 'dashboard/book-appointment', component: AppointmentBookComponent },
  { path: 'dashboard/clinics', component: ClinicsComponent },
  { path: 'dashboard/specialities', component: SpecialitiesComponent },
  { path: 'dashboard/patients', component: PatientsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
