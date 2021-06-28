import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClinicModel} from '../models/clinic.model';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  public allClinics: ClinicModel[] = [];

  private clinicUrl = 'http://localhost:3000/clinics';

  constructor(private http: HttpClient) { }

  public getClinicsServ():Observable<ClinicModel[]> {
    return this.http.get<ClinicModel[]>(`${this.clinicUrl}`);
  }
}

