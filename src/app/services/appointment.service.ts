import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppointmentModel} from '../models/appointment.model';
import {ClinicModel} from '../models/clinic.model';
import {Router} from '@angular/router';
import {ClinicService} from './clinic.service';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  public appointmentUrl = 'http://localhost:3000/appointments';

  public allAppointments: AppointmentModel[] = [];

  public appointment!: AppointmentModel;

  constructor(private http: HttpClient,
              private router: Router,
              public clinicService:ClinicService,
              public loginService: LoginService) { }

  public getAppointmentsServ():Observable<AppointmentModel[]> {
    return this.http.get<AppointmentModel[]>(`${this.appointmentUrl}`);
  }

  public createAppointmentServ(appointment:AppointmentModel): Observable<AppointmentModel> {
    return this.http.post<AppointmentModel>(`${this.appointmentUrl}`, appointment);
  }

  public updateAppointmentServ(appointment: AppointmentModel): Observable<AppointmentModel> {
    return this.http.put<AppointmentModel>(`${this.appointmentUrl}/${appointment.id}`, appointment);
  }

  public openBookAppointmentServ(clinicSelected: ClinicModel) {
    this.router.navigate(['/dashboard/appointments/book'])
        .then(() => {
          this.clinicService.clinic = clinicSelected;
          return this.clinicService.clinic;
        });
  }

  public openAppointmentList(appointments: AppointmentModel[]) {
    this.router.navigate(['/dashboard/appointments'])
        .then(() => {
          this.allAppointments = appointments;
          return this.allAppointments;
        });
  }

}