import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClinicModel} from '../models/clinic.model';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  private clinicUrl = 'http://localhost:3000/clinics';
  private clinicimageUrl = `https://api.unsplash.com/photos/random?client_id=${environment.client_id}&query=`

  public allClinics: ClinicModel[] = [];

  public clinic!: ClinicModel;

  constructor(private http: HttpClient) { }

  public getClinicsServ():Observable<ClinicModel[]> {
    return this.http.get<ClinicModel[]>(`${this.clinicUrl}`);
  }

  public getOneClinicServ(id: number): Observable<ClinicModel> {
    return this.http.get<ClinicModel>(`${this.clinicUrl}/${id}`);
  }

  public createClinicServ(clinic: ClinicModel): Observable<ClinicModel> {
    return this.http.post<ClinicModel>(`${this.clinicUrl}`, clinic);
  }

  public updateClinicServ(clinic: ClinicModel): Observable<ClinicModel> {
    return this.http.put<ClinicModel>(`${this.clinicUrl}/${clinic.id}`, clinic);
  }

  public hasSpecialitiesServ(clinic: ClinicModel)
  {
    return typeof clinic !== 'undefined' && typeof clinic.specialities !== 'undefined';
  }


}


