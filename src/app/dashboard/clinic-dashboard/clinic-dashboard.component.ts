import { Component, OnInit } from '@angular/core';
import {ClinicModel} from '../../models/clinic.model';
import {ClinicService} from '../../services/clinic.service';
import {PatientService} from '../../services/patient.service';
import {PatientModel} from '../../models/patient.model';
import {AppointmentService} from '../../services/appointment.service';
import {AppointmentModel} from '../../models/appointment.model';
import {LoginService} from '../../services/login.service';
import {LegendPosition} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-clinic-dashboard',
  templateUrl: './clinic-dashboard.component.html',
  styleUrls: ['./clinic-dashboard.component.css']
})

export class ClinicDashboardComponent implements OnInit {
  public appointmentsOfClinicLogged: AppointmentModel[] = [];
  public patientsOfClinicLogged: PatientModel[] = [];
  public myPatientsId: number[] = [];

  public legendPosition = LegendPosition.Below;
  public chart: Chart[] = [];
  public chartData = [
    { name: "Patients", value: 1 },
    { name: "Appointments", value: 2 },
    { name: "Specialities", value: 3 }
  ];

  constructor(public clinicService: ClinicService,
              public patientService: PatientService,
              public appointmentService: AppointmentService,
              public loginService: LoginService) { }

  ngOnInit(): void {
    this.appointmentService.getAppointmentsServ().subscribe((allAppointments: AppointmentModel[]) => {
      this.appointmentService.allAppointments = allAppointments;

      for (let appointment of this.appointmentService.allAppointments) {
        if (appointment.clinicId === this.loginService.userLogged.id) {
          this.appointmentsOfClinicLogged.push(appointment);

          if(!this.myPatientsId.includes(appointment.patientId)) {
            this.myPatientsId.push(appointment.patientId);
          }
        }
      }

      this.chartData[1].value = this.appointmentsOfClinicLogged.length;
      this.chart = [...this.chartData];
    });

    this.patientService.getPatientsServ().subscribe((allPatients: PatientModel[]) => {
      this.patientService.allPatients = allPatients;

      for (let patient of this.patientService.allPatients) {
        for (let i = 0; i <= this.myPatientsId.length; i++) {
          if (patient.id === this.myPatientsId[i]) {
            this.patientsOfClinicLogged.push(patient);
          }
        }
      }

      this.chartData[0].value = this.patientsOfClinicLogged.length;
      this.chart = [...this.chartData];
    });

    this.clinicService.getOneClinicServ(this.loginService.userLogged.id!).subscribe((clinic: ClinicModel) => {
      this.clinicService.clinic = clinic;
      this.clinicService.clinic.specialities = clinic.specialities;

      this.chartData[2].value = this.clinicService.clinic.specialities!.length;
       this.chart = [...this.chartData];
    });
  }
}

export interface Chart {
  name: string;
  value: number
}


