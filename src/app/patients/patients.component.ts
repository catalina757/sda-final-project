import { Component, OnInit } from '@angular/core';
import {PatientService} from '../services/patient.service';
import {PatientModel} from '../models/patient.model';
import {LoginService} from '../services/login.service';
import {AppointmentService} from '../services/appointment.service';
import {AppointmentModel} from '../models/appointment.model';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  public myPatientsId: number[] = [];

  constructor(public patientService: PatientService,
              public appointmentService: AppointmentService,
              public loginService: LoginService) { }

  ngOnInit(): void {
    this.patientService.getPatientsServ().subscribe((allPatients: PatientModel[]) => {
      this.patientService.allPatients = allPatients;
    });

    this.appointmentService.getAppointmentsServ().subscribe((allAppointments: AppointmentModel[]) => {
      this.appointmentService.allAppointments = allAppointments;

      for(let appointment of this.appointmentService.allAppointments) {

        if (this.loginService.userLogged.id === appointment.clinicId) {
          this.myPatientsId.push(appointment.patientId);
        }
      }
    })
  }
}
