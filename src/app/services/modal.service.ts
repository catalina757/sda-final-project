import { Injectable } from '@angular/core';
import {ClinicService} from './clinic.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public modifySpecialty: boolean = true;

  public modalOpened: boolean = false;
  public specialtyIndex: number | undefined = 0;

  public specialty: { name?: string; description?: string; doctors?: [{ name?: string; description?: string }] } = {};

  constructor(public clinicService: ClinicService) { }

  openModal(type: string, index?: number | undefined) {
    this.modifySpecialty = !(type === "create");
    this.modalOpened = true;

    if (this.modifySpecialty) {
      this.specialtyIndex = index;
      this.specialty = this.clinicService.clinic.specialities![this.specialtyIndex!];
    }
  }

  closeModal() {
    this.modalOpened = false;
  }

}
