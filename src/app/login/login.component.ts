import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PatientModel} from '../models/patient.model';
import {PatientService} from '../services/patient.service';
import {ClinicService} from '../services/clinic.service';
import {ClinicModel} from '../models/clinic.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public title: string = "Login Form";
    public userType: string = "patient";

    constructor(private patientService: PatientService,
                private clinicService: ClinicService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    get allPatients(): PatientModel[] {
        return this.patientService.allPatients;
    }

    set allPatients(value: PatientModel[]) {
        this.patientService.allPatients = value;
    }

    get allClinics(): ClinicModel[] {
        return this.clinicService.allClinics;
    }

    set allClinics(value: ClinicModel[]) {
        this.clinicService.allClinics = value;
    }

    onSubmit(form: NgForm) {
        if(form.controls.userType.value === 'patient') {
          this.patientService.getPatientsServ().subscribe((patientsList: PatientModel[]) => {
            this.allPatients = patientsList;

            let existEmail = false;
            let existPassword = false;

            for (let i = 0; i < this.allPatients.length; i++) {
              if (form.controls.email.value === this.allPatients[i].email &&
                  form.controls.password.value === this.allPatients[i].password) {
                existEmail = true;
                existPassword = true;
                console.log('patient dashboard');
                this.router.navigate(['dashboard']);
              }
            }

            if(!existEmail || !existPassword) {
              alert("Email or password incorrect");
            }
          });

        } else if (form.controls.userType.value === 'clinic') {
          this.clinicService.getClinicsServ().subscribe((clinicsList: ClinicModel[]) => {
            this.allClinics = clinicsList;

            let existEmail = false;
            let existPassword = false;

            for (let i = 0; i < this.allClinics.length; i++) {
              if (form.controls.email.value === this.allClinics[i].email &&
                  form.controls.password.value === this.allClinics[i].password) {
                existEmail = true;
                existPassword = true;
                console.log('clinic dashboard');
                this.router.navigate(['dashboard']);
              }
            }

            if (!existEmail || !existPassword) {
              alert("Email or password incorrect");
            }
          });
        }
    }
}
