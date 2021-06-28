import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {PatientService} from '../services/patient.service';
import {ClinicService} from '../services/clinic.service';
import {PatientModel} from '../models/patient.model';
import {ClinicModel} from '../models/clinic.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  public title: string = "Online Registration";

  public userType: string = "patient";
  public gender: string = "male";

  public allPatients: PatientModel[] = [];
  public allClinics: ClinicModel[] = [];

  constructor(private http: HttpClient,
              private patientService: PatientService,
              private clinicService: ClinicService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onCreatePatient(patient: PatientModel) {
      this.http.post('http://localhost:3000/patients', patient).subscribe();
  }

  onCreateClinic(clinic: ClinicModel) {
      this.http.post('http://localhost:3000/clinics', clinic).subscribe();
  }

  onSubmit(form: NgForm) {
      if (form.controls.userType.value === 'patient') {
          this.patientService.getPatients().subscribe((patientsList: PatientModel[]) => {
              this.allPatients = patientsList;

              let existEmail = false;
              for (let i = 0; i < this.allPatients.length; i++) {
                  if (form.controls.email.value === this.allPatients[i].email) {
                      existEmail = true;
                  }
              }

              if (!existEmail) {
                  this.onCreatePatient(form.value);
              } else {
                  alert("this email already exists!!!");
              }
          });
      } else {
          this.clinicService.getClinics().subscribe((clinicsList: ClinicModel[]) => {
              this.allClinics = clinicsList;

              let existEmail = false;
              for (let i = 0; i < this.allClinics.length; i++) {
                  if (form.controls.email.value === this.allClinics[i].email) {
                      existEmail = true;
                  }
              }

              if (!existEmail) {
                  this.onCreateClinic(form.value);
              } else {
                  alert("this email already exists!!!");
              }
          });
      }

      if (form.submitted) {

          //atentie!!form.submitted e true chiar si la mail duplicat - sa nu trimita la login desi inregistrarea nu s-a finalizat
          //template html cu mesaj ca s-a inregistrat si apoi redirect catre login

          // this.router.navigate(['login']);

          console.log(form);
      }
  }
}
