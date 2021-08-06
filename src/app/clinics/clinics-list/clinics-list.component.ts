import { Component, OnInit } from '@angular/core';
import {ClinicService} from '../../services/clinic.service';
import {AppointmentService} from '../../services/appointment.service';
import {ClinicModel} from '../../models/clinic.model';

@Component({
  selector: 'app-clinics-list',
  templateUrl: './clinics-list.component.html',
  styleUrls: ['./clinics-list.component.css']
})
export class ClinicsListComponent implements OnInit {

  constructor(public clinicService: ClinicService,
              public appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.clinicService.getClinicsServ().subscribe((allClinics: ClinicModel[]) => {
      this.clinicService.allClinics = allClinics;
    })
  }
}
