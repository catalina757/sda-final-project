import { Component, OnInit } from '@angular/core';
import {AppointmentService} from '../../services/appointment.service';
import {AppointmentModel} from '../../models/appointment.model';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  constructor(public appointmentService: AppointmentService,

              public loginService: LoginService) { }

  ngOnInit(): void {
    this.appointmentService.getAppointmentsServ().subscribe((allAppointments: AppointmentModel[]) => {
      this.appointmentService.allAppointments = allAppointments;
    })
  }

}
