import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // clinicsUrl: string = 'http://localhost:3000/clinics';

  constructor(private http: HttpClient) { }

  // getClinics(): Observable<ClinicModel[]> {
  //   return this.http.get<ClinicModel[]>(this.clinicsUrl);
  // }


}
