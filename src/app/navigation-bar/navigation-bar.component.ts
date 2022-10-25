import { HashLocationStrategy, LocationStrategy, Location} from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface NavigationMenuItem {
  text: string;
  route: string;
}

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.less'],
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class NavigationBarComponent implements OnInit {

  public mainMenu: NavigationMenuItem[] = [];

  constructor() {
  }

  public ngOnInit(): void {
    this.mainMenu = [{
          text: 'Patients',
          route: 'patients',
      }, {
          text: 'Create Patient',
          route: 'edit',
      }];
  }
}
