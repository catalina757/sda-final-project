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
import {ClinicDetailsComponent} from './clinics/clinic-details/clinic-details.component';
import {ClinicsListComponent} from './clinics/clinics-list/clinics-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clinics', component: ClinicsComponent,
    children: [
        { path: '', component: ClinicsListComponent},
        { path: ':id', component: ClinicDetailsComponent }
    ]
  },
  { path: 'specialities', component: SpecialitiesComponent },
  { path: 'patients', component: PatientsComponent},
  { path: 'appointments', component: AppointmentListComponent },
  { path: 'book-appointment', component: AppointmentBookComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
