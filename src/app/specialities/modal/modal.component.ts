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

      if(!this.clinicService.hasSpecialities(clinic)) {
        clinic.specialities = [];
        clinic.specialities.push(form.value);
        this.clinicService.updateClinic(clinic).subscribe();
        this.modalService.closeModal();
        return;
      } else {
        let existSpecialty = false;

        for (let i = 0; i < clinic.specialities!.length; i++) {
          if (form.controls.name.value === clinic.specialities![i].name) {
            existSpecialty = true;
          }
        }

        if (existSpecialty) {
          alert("specialty exist!!!");
        } else {
          clinic.specialities!.push(form.value);
          this.clinicService.updateClinic(clinic).subscribe();
          this.modalService.closeModal();
        }
      }
    });
  }
}

