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
  pagedClinics: ClinicModel[] = [];
  allPages: number = 0;
  itemsPerPage: number = 5;
  receivedCurrentPage: number = 0;

  constructor(public clinicService: ClinicService,
              public appointmentService: AppointmentService,
              public searchService: SearchService) { }

  ngOnInit(): void {
    this.loadClinics("");
  }

  public searchClinicByInput(input: string) {
    this.searchService.currentSearchTerm = input;

    return this.searchService.currentSearchTerm
        ? this.clinicService.allClinics.filter(s => s.clinicName!.toLowerCase().indexOf(this.searchService.currentSearchTerm.toLowerCase()) != -1)
        : this.clinicService.allClinics;
  }

  public filterClinics(input: string) {
    this.clinicService.allClinics = this.searchClinicByInput(input);

    this.onPageChange();
    this.allPages = Math.ceil(this.clinicService.allClinics.length / this.itemsPerPage);
    this.receivedCurrentPage = 1;
  }

  loadClinics(search: string) {
    this.searchService.searchBy(this.searchService.searchByClinicName);

    if (search === "") {
      this.clinicService.getClinicsServ().subscribe((allClinics: ClinicModel[]) => {
        this.clinicService.allClinics = allClinics;

        this.sortClinics(this.clinicService.allClinics);

        this.onPageChange();
        this.allPages = Math.ceil(this.clinicService.allClinics.length / this.itemsPerPage);
      })
    } else if (search != "") {
      this.filterClinics(search);
      this.onPageChange();
    }
  }

  sortClinics(clinics: ClinicModel[]) {
    clinics
        .sort((a: ClinicModel, b: ClinicModel) =>
            a.clinicName!.localeCompare(b.clinicName!));
  }

  onPageChange(page: number = 1): void {
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;
    this.pagedClinics = this.clinicService.allClinics.slice(startItem, endItem);
  }
}
