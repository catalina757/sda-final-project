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
  public allClinicsAppointments: AppointmentModel[] = [];
  pagedAppointments: AppointmentModel[] = [];
  pagedAppointmentsC: AppointmentModel[] = [];
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

      if (this.loginService.userLogged.id === appointment.clinicId) {
        this.allClinicsAppointments.push(appointment);
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
        ? this.allClinicsAppointments.filter(s => s.lastName!.toLowerCase().indexOf(this.searchService.currentSearchTerm.toLowerCase()) != -1)
        : this.allClinicsAppointments;
  }

  public filterAppointments(input: string) {
    if (this.loginService.userLogged.userType === "patient") {
      this.allMyAppointments = this.searchAppointmentOfPatient(input);

      this.onPageChange();
      this.allPages = Math.ceil(this.allMyAppointments.length / this.itemsPerPage);
      this.receivedCurrentPage = 1;
    }

    if (this.loginService.userLogged.userType === "clinic") {
      this.allClinicsAppointments = this.searchAppointmentOfClinic(input);

      this.onPageChange();
      this.allPages = Math.ceil(this.allClinicsAppointments.length / this.itemsPerPage);
      this.receivedCurrentPage = 1;
    }
  }

  loadAppointments(search: string) {
    if (this.loginService.userLogged.userType === "patient") {
      this.searchService.searchBy(this.searchService.searchByClinicName);
    }

    if (this.loginService.userLogged.userType === "clinic") {
      this.searchService.searchBy(this.searchService.searchByPatientName);
    }

    if (search === "") {
      this.appointmentService.getAppointmentsServ().subscribe((allAppointments: AppointmentModel[]) => {
        this.appointmentService.allAppointments = allAppointments;
        this.getMyAppointments();

        if (this.loginService.userLogged.userType === "patient") {
          this.sortMyAppointments(this.allMyAppointments);
          this.allPages = Math.ceil(this.allMyAppointments.length / this.itemsPerPage);
        }

        if (this.loginService.userLogged.userType === "clinic") {
          this.sortMyAppointments(this.allClinicsAppointments);
          this.allPages = Math.ceil(this.allClinicsAppointments.length / this.itemsPerPage);
        }

        this.onPageChange();
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

    if (this.loginService.userLogged.userType === "patient") {
      this.pagedAppointments = this.allMyAppointments.slice(startItem, endItem);
    }

    if (this.loginService.userLogged.userType === "clinic") {
      this.pagedAppointmentsC = this.allClinicsAppointments.slice(startItem, endItem);
    }
  }

  deleteAppointment(appointment: AppointmentModel) {
    this.appointmentService.deleteAppointmentServ(appointment).subscribe(() => {
          this.allMyAppointments = this.allMyAppointments.filter((a: AppointmentModel) => a.id !== appointment.id);
          this.loadAppointments("");
    })
  }

  editAppointment(appointment: AppointmentModel) {
    this.appointmentService.isEdit(appointment);

    this.clinicService.getOneClinicServ(appointment.clinicId).subscribe((clinic: ClinicModel) => {
      this.clinicService.clinic = clinic;
    });
  }
}
