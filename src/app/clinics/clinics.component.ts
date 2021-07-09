import {Component, OnInit} from '@angular/core';
import {ClinicService} from '../services/clinic.service';
import {ClinicModel} from '../models/clinic.model';
import {AppointmentService} from '../services/appointment.service';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.css']
})
export class ClinicsComponent implements OnInit {

  constructor(public clinicService: ClinicService,
              public appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.clinicService.getClinicsServ().subscribe((allClinics: ClinicModel[]) => {
      this.clinicService.allClinics = allClinics;
    })
  }
}
