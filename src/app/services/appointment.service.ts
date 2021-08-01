import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppointmentModel} from '../models/appointment.model';
import {ClinicModel} from '../models/clinic.model';
import {Router} from '@angular/router';
import {ClinicService} from './clinic.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  public appointmentUrl = 'http://localhost:3000/appointments';

  public allAppointments: AppointmentModel[] = [];

  public appointment!: AppointmentModel;

  constructor(private http: HttpClient,
              private router: Router,
              public clinicService:ClinicService) { }

  public getAppointmentsServ():Observable<AppointmentModel[]> {
    return this.http.get<AppointmentModel[]>(`${this.appointmentUrl}`);
  }

  public getOneAppointmentServ(id: number): Observable<AppointmentModel> {
      return this.http.get<AppointmentModel>(`${this.appointmentUrl}/${id}`);
  }

  public createAppointmentServ(appointment:AppointmentModel): Observable<AppointmentModel> {
    return this.http.post<AppointmentModel>(`${this.appointmentUrl}`, appointment);
  }

  public updateAppointmentServ(appointment: AppointmentModel): Observable<AppointmentModel> {
    return this.http.put<AppointmentModel>(`${this.appointmentUrl}/${appointment.id}`, appointment);
  }

  public deleteAppointmentServ(appointment: AppointmentModel): Observable<AppointmentModel> {
      return this.http.delete<AppointmentModel>(`${this.appointmentUrl}/${appointment.id}`);
  }

  public openBookAppointmentServ(clinicSelected: ClinicModel) {
    this.router.navigate(['/dashboard/book-appointment'])
        .then(() => {
          this.clinicService.clinic = clinicSelected;
          return this.clinicService.clinic;
        });
  }
}
