import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  public routerLink: string = "";

  constructor(public loginService: LoginService,
              public router: Router) {

    this.router.events.subscribe((event: any) => {
          if (event instanceof NavigationEnd) {
            this.routerLink = this.router.url;
            console.log(this.routerLink);
          }
        }
    );
  }

  ngOnInit(): void {}

}
