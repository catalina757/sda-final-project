import { Component, OnInit } from '@angular/core';
import {PatientService} from '../services/patient.service';
import {PatientModel} from '../models/patient.model';
import {LoginService} from '../services/login.service';
import {AppointmentService} from '../services/appointment.service';
import {AppointmentModel} from '../models/appointment.model';
import {SearchService} from '../services/search.service';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  public myPatientsId: number[] = [];

  constructor(public patientService: PatientService,
              public appointmentService: AppointmentService,
              public loginService: LoginService,
              public searchService: SearchService) { }

  ngOnInit(): void {
    this.loadPatients("");
  }

  public searchPatientByInput(input: string) {
    this.searchService.currentSearchTerm = input;

    return this.searchService.currentSearchTerm
        ? this.patientService.allPatients.filter(s => s.lastName!.toLowerCase().indexOf(this.searchService.currentSearchTerm.toLowerCase()) != -1)
        : this.patientService.allPatients;
  }

  public filterPatients(input: string) {
    this.patientService.allPatients = this.searchPatientByInput(input);
  }

  loadPatients(search: string) {
    this.searchService.searchBy(this.searchService.searchByPatientName);

    if (search === "") {
      this.patientService.getPatientsServ().subscribe((allPatients: PatientModel[]) => {
        this.patientService.allPatients = allPatients;

        this.patientService.allPatients
            .sort((a: PatientModel, b: PatientModel) =>
                a.lastName!.localeCompare(b.lastName!));
      });

      this.appointmentService.getAppointmentsServ().subscribe((allAppointments: AppointmentModel[]) => {
        this.appointmentService.allAppointments = allAppointments;

        for(let appointment of this.appointmentService.allAppointments) {
          if (this.loginService.userLogged.id === appointment.clinicId) {
            this.myPatientsId.push(appointment.patientId);
          }
        }
      });
    } else if (search != "") {
      this.filterPatients(search);
    }
  }
}
