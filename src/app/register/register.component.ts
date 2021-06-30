import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PatientService} from '../services/patient.service';
import {ClinicService} from '../services/clinic.service';
import {PatientModel} from '../models/patient.model';
import {ClinicModel} from '../models/clinic.model';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    public title: string = "Online Registration";

    public userType: string = "patient";
    public gender: string = "male";

    constructor(private http: HttpClient,
                private patientService: PatientService,
                private clinicService: ClinicService,
                private router: Router) {}

    ngOnInit(): void {
        this.readPatientsList();
        this.readClinicsList();
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

    readPatientsList() {
        this.patientService.getPatientsServ().subscribe((patientsList: PatientModel[]) => {
            this.allPatients = patientsList;
        });
    }

    readClinicsList() {
        this.clinicService.getClinicsServ().subscribe((clinicsList: ClinicModel[]) => {
            this.allClinics = clinicsList;
        })
    }

    onSubmit(form: NgForm) {
        if (form.controls.userType.value === 'patient') {
            let existEmail = false;

            for (let i = 0; i < this.allPatients.length; i++) {
                if (form.controls.email.value === this.allPatients[i].email) {
                    existEmail = true;
                }
            }

            if (!existEmail) {
                this.patientService.createPatientServ(form.value).subscribe((newPatient: PatientModel) => {
                    this.allPatients.push(newPatient);
                });
                this.router.navigate(['login']);

            } else {
                alert("This email already exists!!!");
            }

        } else if(form.controls.userType.value === 'clinic') {
            let existEmail = false;
            for (let i = 0; i < this.allClinics.length; i++) {
                if (form.controls.email.value === this.allClinics[i].email) {
                    existEmail = true;
                }
            }

            if (!existEmail) {
                this.clinicService.createClinicServ(form.value).subscribe((newClinic: ClinicModel) => {
                    this.allClinics.push(newClinic);
                });
                this.router.navigate(['login']);

            } else {
                alert("this email already exists!!!");
            }
        }
    }

    passwordModel = {
        password: null,
        confirmPassword: null
    };
}

