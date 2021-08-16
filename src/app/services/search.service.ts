import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public searchPlaceholder: string = ""
  public currentSearchTerm: string = "";
  public searchByClinicName: string = "Search by clinic name";
  public searchBySpecialty: string = "Search by specialty";
  public searchByPatientName: string = "Search by patient name";

  constructor() { }

  public searchBy(byItem: string) {
    let element = document.getElementById('search');
    element!.setAttribute("placeholder", byItem);
    this.searchPlaceholder = byItem;
  }

}
