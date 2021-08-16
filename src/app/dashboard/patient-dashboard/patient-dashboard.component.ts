import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {ClinicService} from '../../services/clinic.service';
import {AppointmentService} from '../../services/appointment.service';
import {AppointmentModel} from '../../models/appointment.model';
import {PatientModel} from '../../models/patient.model';
import {ClinicModel} from '../../models/clinic.model';
import {LegendPosition} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
  public appointmentsOfPatientLogged: AppointmentModel[] = [];
  public clinicsOfPatientLogged: PatientModel[] = [];
  public myClinicsId: number[] = [];

  public legendPosition = LegendPosition.Below;
  public chart: Chart[] = [];
  public chartData = [
    { name: "My clinics", value: 1 },
    { name: "My appointments", value: 2 },
    { name: "All clinics", value: 3 }
  ];

  constructor(public clinicService: ClinicService,
              public appointmentService: AppointmentService,
              public loginService: LoginService) { }

  ngOnInit(): void {
    this.appointmentService.getAppointmentsServ().subscribe((allAppointments: AppointmentModel[]) => {
      this.appointmentService.allAppointments = allAppointments;

      for (let appointment of this.appointmentService.allAppointments) {
        if (appointment.patientId === this.loginService.userLogged.id) {
          this.appointmentsOfPatientLogged.push(appointment);

          if(!this.myClinicsId.includes(appointment.clinicId)) {
            this.myClinicsId.push(appointment.clinicId);
          }
        }
      }

      this.chartData[1].value = this.appointmentsOfPatientLogged.length;
      this.chart = [...this.chartData];
    });

    this.clinicService.getClinicsServ().subscribe((allClinics: ClinicModel[]) => {
      this.clinicService.allClinics = allClinics;

      this.chartData[2].value = this.clinicService.allClinics.length;
      this.chart = [...this.chartData];

      for (let clinic of this.clinicService.allClinics) {
        for (let i = 0; i <= this.myClinicsId.length; i++) {
          if (clinic.id === this.myClinicsId[i]) {
            this.clinicsOfPatientLogged.push(clinic);
            console.log(this.clinicsOfPatientLogged);
          }
        }
      }

      this.chartData[0].value = this.clinicsOfPatientLogged.length;
      this.chart = [...this.chartData];
    });

  }

}

export interface Chart {
  name: string;
  value: number
}