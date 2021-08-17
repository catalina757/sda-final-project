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
  @Input() public specialtyIndex: number = 0;



  constructor(private loginService: LoginService,
              public clinicService: ClinicService,
              public modalService: ModalService) { }

  ngOnInit(): void {}

  onCreate(form: NgForm) {
    this.clinicService.getOneClinicServ(this.loginService.userLogged.id!).subscribe((clinic:ClinicModel) => {
      this.clinicService.clinic = clinic;

      if(!this.clinicService.hasSpecialitiesServ(clinic)) {
        clinic.specialities = [];
        clinic.specialities.push(form.value);
        this.clinicService.updateClinicServ(clinic).subscribe();
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
          this.clinicService.updateClinicServ(clinic).subscribe();
          this.modalService.closeModal();
        }
      }
    });
  }

  onEdit(form: NgForm) {
    this.modalService.specialty = form.value;

    this.clinicService.clinic.specialities![this.modalService.specialtyIndex!].name = this.modalService.specialty.name;
    this.clinicService.clinic.specialities![this.modalService.specialtyIndex!].description = this.modalService.specialty.description;

    this.clinicService.updateClinicServ(this.clinicService.clinic).subscribe();

    this.modalService.closeModal();
  }
}

