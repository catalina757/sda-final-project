import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {ClinicService} from '../../services/clinic.service';
import {AppointmentService} from '../../services/appointment.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-appointment-book-details',
  templateUrl: './appointment-book-details.component.html',
  styleUrls: ['./appointment-book-details.component.css']
})
export class AppointmentBookDetailsComponent implements OnInit {
  selectedSpecialty: string = "";

  constructor(public loginService: LoginService,
              public clinicService: ClinicService,
              public appointmentService: AppointmentService,
              private router: Router) { }

  ngOnInit(): void {
    this.selectedSpecialty = this.appointmentService.appointment.specialty;
  }

  onEdit(form: NgForm) {
    this.appointmentService.updateAppointmentServ(form.value).subscribe();

    this.router.navigate(['appointments']);
  }
}
