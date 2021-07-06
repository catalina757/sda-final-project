import { Injectable } from '@angular/core';
import {UserLogged} from '../models/user-logged.model';
import {Router} from '@angular/router';
import {LocalStorage, LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  @LocalStorage()

  public userLogged!: UserLogged;

  constructor(private router: Router,
              private localStorage: LocalStorageService) {
  }

  saveUserLogged() {
    this.localStorage.store("userLogged", this.userLogged);
  }

  retrieveUserLogged() {
    this.userLogged = this.localStorage.retrieve('userLogged');
  }

  logout() {
    if (this.userLogged) {
      this.router.navigate(['login'])
          .then(() => {
            this.localStorage.clear("userLogged");
          });
    }
    this.retrieveUserLogged();
  }
}

