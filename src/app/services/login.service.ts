import { Injectable } from '@angular/core';
import {UserLogged} from '../models/user-logged.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public userLogged!: UserLogged;

  constructor(private router: Router) { }

  logout() {
    if(this.userLogged) {
      this.router.navigate(['login'])
          .then(()=> {
            this.userLogged = new UserLogged();
            console.log(this.userLogged );
          })
    }
  }
}

