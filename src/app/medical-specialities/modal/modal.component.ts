import {Component, Input, OnInit} from '@angular/core';
import {ClinicModel} from '../../models/clinic.model';
import {LoginService} from '../../services/login.service'
import {ClinicService} from '../../services/clinic.service';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() modalOpenMessage: boolean = false;

  public specialities: Specialty[] = [];

  constructor(public loginService: LoginService,
              public clinicService: ClinicService,
              public modalService: ModalService) { }

  ngOnInit(): void {
  }

  onCreate() {
    this
    this.loginService.userLogged["specialities"] = [];
    this.loginService.userLogged.specialities = [
      {id: 1, name: 'something', description: 'descriere descriere', doctors: [{id: 1, name: 'Doctor', description: "description of the doctor"}]},
      {id: 2, name: 'anything else', description: 'descriere descriere descriere'},
    ];

    this.specialities = this.loginService.userLogged.specialities;

    // if(this.loginService.userLogged) {
    // this.specialities = this.loginService.userLogged.specialities!;
    // }

    this.findClinic();
  }

  findClinic() {
    this.clinicService.getClinicsServ().subscribe((clinicsList: ClinicModel[]) => {
      this.clinicService.allClinics = clinicsList;

      for (let i = 0; i< clinicsList.length; i++) {
        if(clinicsList[i].id === this.loginService.userLogged.id) {
          this.clinicService.clinic = clinicsList[i];
          this.clinicService.clinic.specialities = this.loginService.userLogged.specialities;

          console.log(this.clinicService.clinic);
          console.log(this.loginService.userLogged);
        }
      }
    })
  }
}

//de mutat in models
export interface Specialty {
  id: number,
  name: string,
  description: string,
  doctors? : [
    {
      id: number,
      name: string,
      description: string
    }
  ]
}
