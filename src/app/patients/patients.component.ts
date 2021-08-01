import { Component, OnInit } from '@angular/core';
import {PatientService} from '../services/patient.service';
import {AppointmentService} from '../services/appointment.service';
import {PatientModel} from '../models/patient.model';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  constructor(public patientService: PatientService,
              public appointmentService: AppointmentService,
              public loginService: LoginService) { }

  ngOnInit(): void {
    this.patientService.getPatientsServ().subscribe((allPatients: PatientModel[]) => {
      this.patientService.allPatients = allPatients;
    });
  }
}
