import {Component, OnInit} from '@angular/core';
import {PatientService} from '../services/patient.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // public userType: string = "clinic";

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
  }

}
