import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public searchByClinicName: string = "Search by clinic name";
  public searchBySpecialty: string = "Search by specialty";

  constructor() { }

  public searchBy(byItem: string) {
    let element = document.getElementById('search');
    element!.removeAttribute("placeholder");
    element!.setAttribute("placeholder", byItem);
  }

}
