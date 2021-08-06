import { Component, OnInit } from '@angular/core';
import {ClinicService} from '../../services/clinic.service';
import {LoginService} from '../../services/login.service';
import {AppointmentService} from '../../services/appointment.service';
import {Router} from '@angular/router';
import {AppointmentModel} from '../../models/appointment.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-appointment-book',
  templateUrl: './appointment-book.component.html',
  styleUrls: ['./appointment-book.component.css']
})
export class AppointmentBookComponent implements OnInit {

  constructor(public clinicService: ClinicService,
              public loginService: LoginService,
              public appointmentService: AppointmentService,
              private router: Router) { }

  ngOnInit(): void {
  }

  get allAppointments(): AppointmentModel[] {
    return this.appointmentService.allAppointments;
  }

  onSubmit(form: NgForm) {
    this.appointmentService.createAppointmentServ(form.value)
        .subscribe((newAppointment: AppointmentModel) => {
      this.allAppointments.push(newAppointment);
    });

    this.router.navigate(['appointments'])
        .then(() => console.log(this.allAppointments));
  }
}
