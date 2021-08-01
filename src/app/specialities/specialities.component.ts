import {Component, OnInit} from '@angular/core';
import {ModalService} from '../services/modal.service';
import {ClinicService} from '../services/clinic.service';
import {LoginService} from '../services/login.service';
import {ClinicModel} from '../models/clinic.model';


@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.css']
})

export class SpecialitiesComponent implements OnInit {

  constructor(public modalService: ModalService,
              public clinicService: ClinicService,
              private loginService: LoginService) {}


  ngOnInit() {
    this.clinicService. getOneClinicServ(this.loginService.userLogged.id!).subscribe((clinic: ClinicModel) => {
      this.clinicService.clinic = clinic;
    })
  }

}


