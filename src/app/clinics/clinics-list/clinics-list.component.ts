import { Component, OnInit } from '@angular/core';
import {ClinicService} from '../../services/clinic.service';
import {AppointmentService} from '../../services/appointment.service';
import {ClinicModel} from '../../models/clinic.model';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-clinics-list',
  templateUrl: './clinics-list.component.html',
  styleUrls: ['./clinics-list.component.css']
})
export class ClinicsListComponent implements OnInit {
  public currentSearchTerm: string = "";

  constructor(public clinicService: ClinicService,
              public appointmentService: AppointmentService,
              public searchService: SearchService) { }

  ngOnInit(): void {
    this.loadClinics("");
  }

  //filtrare input litere mari/mici in nume clinica
  public searchClinicByInput(input: string) {
    this.currentSearchTerm = input;
    return input ? this.clinicService.allClinics.filter(s => s.clinicName!.toLowerCase().indexOf(input.toLowerCase()) != -1)
        : this.clinicService.allClinics;
  }

  // lista filtrata dupa nume
  public filterClinics(input: string) {
    this.clinicService.allClinics = this.searchClinicByInput(input);
  }

  loadClinics(search: string) {
    this.searchService.searchBy(this.searchService.searchByClinicName);

    if (search === "") {
      this.clinicService.getClinicsServ().subscribe((allClinics: ClinicModel[]) => {
        this.clinicService.allClinics = allClinics;
      })
    } else if (search != "") {
      console.log(search);
      //apelez functia de filtrare aici
      this.filterClinics(search);
    }
  }
}
