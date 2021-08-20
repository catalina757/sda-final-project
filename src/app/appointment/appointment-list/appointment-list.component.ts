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
  public allMyAppointments: AppointmentModel[] = [];
  pagedAppointments: AppointmentModel[] = [];
  allPages: number = 0;
  itemsPerPage: number = 5;
  receivedCurrentPage: number = 0;

  constructor(public appointmentService: AppointmentService,
              public loginService: LoginService,
              public clinicService: ClinicService,
              public searchService: SearchService,
              public router: Router) { }

  ngOnInit(): void {
    this.loadAppointments("");
  }

  public getMyAppointments(): void {
    for (let appointment of this.appointmentService.allAppointments) {
      if (this.loginService.userLogged.id === appointment.patientId) {
        this.allMyAppointments.push(appointment);
      }
    }
  }

  public searchAppointmentOfPatient(input: string) {
    this.searchService.currentSearchTerm = input;

    return this.searchService.currentSearchTerm
        ? this.allMyAppointments.filter(s => s.clinicName!.toLowerCase().indexOf(this.searchService.currentSearchTerm.toLowerCase()) != -1)
        : this.allMyAppointments;
  }

  public searchAppointmentOfClinic(input: string) {
    this.searchService.currentSearchTerm = input;

    return this.searchService.currentSearchTerm
        ? this.appointmentService.allAppointments.filter(s => s.lastName!.toLowerCase().indexOf(this.searchService.currentSearchTerm.toLowerCase()) != -1)
        : this.appointmentService.allAppointments;
  }

  public filterAppointments(input: string) {
    if (this.loginService.userLogged.userType === "patient") {
      this.allMyAppointments = this.searchAppointmentOfPatient(input);

      this.onPageChange();
      this.allPages = Math.ceil(this.allMyAppointments.length / this.itemsPerPage);
      this.receivedCurrentPage = 1;
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
        this.getMyAppointments();
        this.sortMyAppointments(this.allMyAppointments);

        this.onPageChange();
        this.allPages = Math.ceil(this.allMyAppointments.length / this.itemsPerPage);
      });
    } else {
      this.filterAppointments(search);
      this.onPageChange();
    }
  }

  sortMyAppointments(appointments: AppointmentModel[]) {
    appointments
        .sort((a: AppointmentModel, b: AppointmentModel) =>
            a.date!.localeCompare(b.date!));
  }

  onPageChange(page: number = 1): void {
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;
    this.pagedAppointments = this.allMyAppointments.slice(startItem, endItem);
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
    });

    for (let myAppointment of this.allMyAppointments) {
      myAppointment = appointment;
    }

    console.log(this.allMyAppointments);
  }
}
