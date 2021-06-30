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
    public loginIncorrect: boolean = true;

    constructor(private patientService: PatientService,
                private clinicService: ClinicService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    onSubmit(form: NgForm) {
        // let loginIncorrect = true;

        this.patientService.getPatientsServ().subscribe((patientsList: PatientModel[]) => {
            this.patientService.allPatients = patientsList;

            this.patientService.allPatients.forEach((patient) => {
                if (form.controls.email.value === patient.email &&
                    form.controls.password.value === patient.password) {

                    this.patientService.patient = patient;

                    this.router.navigate(['dashboard']);

                    this.loginIncorrect = false;

                    return;
                }
            });

            if (this.loginIncorrect) {
                alert("Email or password incorrect");
            }
        });

        this.clinicService.getClinicsServ().subscribe((clinicsList: ClinicModel[]) => {
            this.clinicService.allClinics = clinicsList;

            this.clinicService.allClinics.forEach((clinic: ClinicModel) => {
                if (form.controls.email.value === clinic.email &&
                    form.controls.password.value === clinic.password) {

                    this.clinicService.clinic = clinic;

                    this.router.navigate(['dashboard']);

                    this.loginIncorrect = false;

                    return;
                }
            });

            if (this.loginIncorrect) {
                alert("Email or password incorrect");
            }
        });

        console.log(this.loginIncorrect);
    }
}

//trebuie verificat!!! onsubmit - daca user incorect afiseaza alerta de 2 ori pt fiecare : pacient si clinica - cum fac sa reduc functia...
// https://angular.io/guide/form-validation
