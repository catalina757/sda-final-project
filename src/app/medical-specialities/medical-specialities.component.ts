import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-medical-specialities',
  templateUrl: './medical-specialities.component.html',
  styleUrls: ['./medical-specialities.component.css']
})
export class MedicalSpecialitiesComponent implements OnInit {
  public specialities: {id: number, name: string}[] = [];

  constructor(public loginService: LoginService) { }

  ngOnInit(): any {
    if(this.loginService.userLogged) {
      this.specialities = this.loginService.userLogged.specialities!;
    }

  }

}
