import { Component, OnInit } from '@angular/core';
import {AppointmentService} from '../../services/appointment.service';
import {AppointmentModel} from '../../models/appointment.model';
import {LoginService} from '../../services/login.service';
import {ClinicService} from '../../services/clinic.service';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  public currentSearchTerm: string = "";

  constructor(public appointmentService: AppointmentService,
              public loginService: LoginService,
              public clinicService: ClinicService,
              public searchService: SearchService) { }

  ngOnInit(): void {
    this.loadAppointments("");
  }



  public searchAppointmentByInput(input: string) {
    this.currentSearchTerm = input;
    return input ? this.appointmentService.allAppointments.filter(s => s.specialty.toLowerCase().indexOf(input.toLowerCase()) != -1)
        : this.appointmentService.allAppointments;
  }

  public filterAppointments(input: string) {
    this.appointmentService.allAppointments = this.searchAppointmentByInput(input);
  }

  loadAppointments(search: string) {
    this.searchService.searchBy(this.searchService.searchBySpecialty);

    if (search === "") {
      this.appointmentService.getAppointmentsServ().subscribe((allAppointments: AppointmentModel[]) => {
        this.appointmentService.allAppointments = allAppointments;
      })
    } else if (search != "") {
      console.log(search);
      this.filterAppointments(search);
    }
  }

  deleteAppointment(appointment: AppointmentModel) {
    this.appointmentService.deleteAppointmentServ(appointment).subscribe(
        () => (this.appointmentService.allAppointments = this.appointmentService.allAppointments.filter((a) => a.id !== appointment.id)))
    return this.appointmentService.allAppointments;
  }

}
