import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PatientModel} from '../models/patient.model';
import {PatientService} from '../services/patient.service';
import {ClinicService} from '../services/clinic.service';
import {ClinicModel} from '../models/clinic.model';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';

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
                private loginService: LoginService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    onSubmit(form: NgForm) {
        let loginIncorrect = true;

        if(this.userType === "patient") {
            this.patientService.getPatientsServ().subscribe((patientsList: PatientModel[]) => {
                this.patientService.allPatients = patientsList;

                this.patientService.allPatients.forEach((patient) => {
                    if (form.controls.email.value === patient.email &&
                        form.controls.password.value === patient.password) {

                        this.router.navigate(['dashboard'])
                            .then(() => {
                                this.loginService.userLogged = patient;
                                return this.loginService.userLogged;
                            });

                        loginIncorrect = false;

                        return;
                    }
                });

                if (loginIncorrect) {
                    alert("Email or password incorrect");
                }
            });

        } else if (this.userType === "clinic") {
            this.clinicService.getClinicsServ().subscribe((clinicsList: ClinicModel[]) => {
                this.clinicService.allClinics = clinicsList;

                this.clinicService.allClinics.forEach((clinic: ClinicModel) => {
                    if (form.controls.email.value === clinic.email &&
                        form.controls.password.value === clinic.password) {

                        this.router.navigate(['dashboard'])
                            .then(() => {
                                this.loginService.userLogged = clinic;
                                return this.loginService.userLogged;
                            });

                        loginIncorrect = false;

                        return;
                    }
                });

                if (loginIncorrect) {
                    alert("Email or password incorrect");
                }
            });
        }
        this.loginService.saveUserLogged();
    }
}

// https://angular.io/guide/form-validation
// https://www.npmjs.com/package/ngx-webstorage
