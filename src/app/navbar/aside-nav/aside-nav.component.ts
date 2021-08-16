import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.css']
})
export class AsideNavComponent implements OnInit {
  public isMobile: boolean = false;

  constructor(public loginService: LoginService) {
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
