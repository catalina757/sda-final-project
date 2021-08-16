import {Component, OnInit} from '@angular/core';
import {ClinicService} from '../services/clinic.service';
import {ClinicModel} from '../models/clinic.model';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.css']
})
export class ClinicsComponent implements OnInit {

  constructor(public clinicService: ClinicService) { }

  ngOnInit(): void {
    this.clinicService.getClinicsServ().subscribe((allClinics: ClinicModel[]) => {
      this.clinicService.allClinics = allClinics;
    })
  }
}
