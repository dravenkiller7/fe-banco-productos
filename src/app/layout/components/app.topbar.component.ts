import {Component, ElementRef, ViewChild} from '@angular/core';
import {LayoutService} from "../service/app.layout.service";
import {MenuItemModel} from "../api/menu-item.model";

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

  items!: MenuItemModel[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService) {
  }
}
