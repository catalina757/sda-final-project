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

  constructor(public clinicService: ClinicService,
              public appointmentService: AppointmentService,
              public searchService: SearchService) { }

  ngOnInit(): void {
    this.loadClinics("");
  }

  //filtrare input litere mari/mici in nume clinica
  public searchClinicByInput(input: string) {
    this.searchService.currentSearchTerm = input;

    return this.searchService.currentSearchTerm
        ? this.clinicService.allClinics.filter(s => s.clinicName!.toLowerCase().indexOf(this.searchService.currentSearchTerm.toLowerCase()) != -1)
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
