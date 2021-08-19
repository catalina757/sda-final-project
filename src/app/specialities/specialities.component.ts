import {Component, OnInit} from '@angular/core';
import {ModalService} from '../services/modal.service';
import {ClinicService} from '../services/clinic.service';
import {LoginService} from '../services/login.service';
import {ClinicModel} from '../models/clinic.model';
import {SearchService} from '../services/search.service';
import {AppointmentModel} from '../models/appointment.model';


@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.css']
})

export class SpecialitiesComponent implements OnInit {

  constructor(public modalService: ModalService,
              public clinicService: ClinicService,
              public loginService: LoginService,
              public searchService: SearchService) {}


  ngOnInit() {
    this.loadSpecialities("");
  }

  public searchSpecialitiesByInput(input: string) {
    this.searchService.currentSearchTerm = input;
    return this.searchService.currentSearchTerm
        ? this.clinicService.clinic.specialities!.filter(s => s.name!.toLowerCase().indexOf(this.searchService.currentSearchTerm.toLowerCase()) != -1)
        : this.clinicService.clinic.specialities;
  }

  public filterSpecialities(input: string) {
    this.clinicService.clinic.specialities = this.searchSpecialitiesByInput(input);
  }

  loadSpecialities(search: string) {
    this.searchService.searchBy(this.searchService.searchBySpecialty);

    if (search === "") {
      this.clinicService.getOneClinicServ(this.loginService.userLogged.id!).subscribe((clinic: ClinicModel) => {
        this.clinicService.clinic = clinic;

        this.clinicService.clinic.specialities!
            .sort((a, b) =>
                a.name!.localeCompare(b.name!));
      });
    } else {
      this.filterSpecialities(search);
    }
  }

  deleteSpecialtyFromClinic(name: string) {
    if (this.clinicService.clinic.specialities != undefined) {
      this.clinicService.clinic.specialities.forEach((specialty, index) => {
        if (specialty.name === name && this.clinicService.clinic.specialities != undefined) {
          this.clinicService.clinic.specialities.splice(index, 1);
        }
      });
    }
    this.clinicService.updateClinicServ(this.clinicService.clinic).subscribe();
  }
}
