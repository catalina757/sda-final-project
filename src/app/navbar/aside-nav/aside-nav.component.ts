import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.css']
})
export class AsideNavComponent implements OnInit {
  public isMobile: boolean = false;
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

  ngOnInit(): void {
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    }
  }

  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 992;
    return w < breakpoint;
  }

  clickToggleButton(): void {
    let sidebar = document.getElementById('sidebar');
    let collapsedButton = document.getElementById('collapsed');

    if(collapsedButton!.classList.contains('collapsed')) {
      sidebar!.classList.add('hidden-aside-nav');
    } else {
      sidebar!.classList.remove('hidden-aside-nav');
    }
  }

}
