import {Component, Input, OnInit} from '@angular/core';
import {ClinicModel} from '../../models/clinic.model';
import {LoginService} from '../../services/login.service'
import {ClinicService} from '../../services/clinic.service';
import {ModalService} from '../../services/modal.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() modalOpenMessage: boolean = false;

  constructor(public loginService: LoginService,
              public clinicService: ClinicService,
              public modalService: ModalService) { }

  ngOnInit(): void {
  }

  onCreate(form: NgForm) {
    this.clinicService.getOneClinicServ(this.loginService.userLogged.id!).subscribe((clinic:ClinicModel) => {
      this.clinicService.clinic = clinic;

      if(typeof this.clinicService.clinic.specialities === 'undefined') {
        this.clinicService.clinic.specialities = [];
        this.clinicService.clinic.specialities.push(form.value);
        this.clinicService.updateClinic(this.clinicService.clinic).subscribe();
        this.modalService.closeModal();
        return;
      }

      let existSpecialty = false;

      for (let i = 0; i < this.clinicService.clinic.specialities.length; i++) {
        if (form.controls.name.value === this.clinicService.clinic.specialities[i].name) {
          existSpecialty = true;
        }
      }

      if (existSpecialty) {
        alert("specialty exist!!!");
      } else {
        this.clinicService.clinic.specialities.push(form.value);
        this.clinicService.updateClinic(this.clinicService.clinic).subscribe();
        this.modalService.closeModal();
      }
    });
  }
}

