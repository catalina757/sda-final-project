import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.css']
})
export class AsideNavComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }

}
