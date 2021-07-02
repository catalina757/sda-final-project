import {Component, OnInit} from '@angular/core';
import {ModalService} from '../services/modal.service';

@Component({
  selector: 'app-medical-specialities',
  templateUrl: './medical-specialities.component.html',
  styleUrls: ['./medical-specialities.component.css']
})
export class MedicalSpecialitiesComponent implements OnInit {

  constructor(public modalService: ModalService) { }

  ngOnInit() {
  }

}


