import { Component, OnInit } from '@angular/core';
import {AppointmentService} from '../../services/appointment.service';
import {AppointmentModel} from '../../models/appointment.model';
import {LoginService} from '../../services/login.service';
import {ClinicService} from '../../services/clinic.service';
import {SearchService} from '../../services/search.service';
import {Router} from '@angular/router';
import {ClinicModel} from '../../models/clinic.model';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  constructor(public appointmentService: AppointmentService,
              public loginService: LoginService,
              public clinicService: ClinicService,
              public searchService: SearchService,
              public router: Router) { }

  ngOnInit(): void {
    this.loadAppointments("");
  }

  public searchAppointmentOfPatient(input: string) {
    this.searchService.currentSearchTerm = input;

    return this.searchService.currentSearchTerm
        ? this.appointmentService.allAppointments.filter(s => s.clinicName!.toLowerCase().indexOf(this.searchService.currentSearchTerm.toLowerCase()) != -1)
        : this.appointmentService.allAppointments;
  }

  public searchAppointmentOfClinic(input: string) {
    this.searchService.currentSearchTerm = input;

    return this.searchService.currentSearchTerm
        ? this.appointmentService.allAppointments.filter(s => s.lastName!.toLowerCase().indexOf(this.searchService.currentSearchTerm.toLowerCase()) != -1)
        : this.appointmentService.allAppointments;
  }

  public filterAppointments(input: string) {
    if (this.loginService.userLogged.userType === "patient") {
      this.appointmentService.allAppointments = this.searchAppointmentOfPatient(input);
    }

    if (this.loginService.userLogged.userType === "clinic") {
      this.appointmentService.allAppointments = this.searchAppointmentOfClinic(input);
    }
  }

  loadAppointments(search: string) {
    if (this.loginService.userLogged.userType === "patient") {
      this.searchService.searchBy(this.searchService.searchByClinicName);
    } else if (this.loginService.userLogged.userType === "clinic") {
      this.searchService.searchBy(this.searchService.searchByPatientName);
    }


    if (search === "") {
      this.appointmentService.getAppointmentsServ().subscribe((allAppointments: AppointmentModel[]) => {
        this.appointmentService.allAppointments = allAppointments;

        this.appointmentService.allAppointments
            .sort((a: AppointmentModel, b: AppointmentModel) =>
                a.date!.localeCompare(b.date!));
      });
    } else if (search != "") {
      this.filterAppointments(search);
    }
  }

  deleteAppointment(appointment: AppointmentModel) {
    this.appointmentService.deleteAppointmentServ(appointment).subscribe(
        () => (this.appointmentService.allAppointments = this.appointmentService.allAppointments
            .filter((a) => a.id !== appointment.id)))
    return this.appointmentService.allAppointments;
  }

  editAppointment(appointment: AppointmentModel) {
    this.appointmentService.isEdit(appointment);

    this.clinicService.getOneClinicServ(appointment.clinicId).subscribe((clinic: ClinicModel) => {
      this.clinicService.clinic = clinic;
      console.log(this.clinicService.clinic.clinicName);
    });

    this.appointmentService.appointment = appointment;
  }
}
