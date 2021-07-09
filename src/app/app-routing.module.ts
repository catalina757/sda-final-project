import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent} from './home/home.component';
import {SpecialitiesComponent} from './specialities/specialities.component';
import {ClinicsComponent} from './clinics/clinics.component';
import {AppointmentComponent} from './appointment/appointment.component';
import {AppointmentBookComponent} from './appointment/appointment-book/appointment-book.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/specialities', component: SpecialitiesComponent },
  { path: 'dashboard/clinics', component: ClinicsComponent },
  { path: 'dashboard/appointments', component: AppointmentComponent},
  { path: 'dashboard/appointments/book', component: AppointmentBookComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
