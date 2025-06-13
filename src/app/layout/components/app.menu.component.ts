import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {LayoutService} from '../service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(public layoutService: LayoutService) {
  }

  ngOnInit() {
    this.model = [
      {
        label: 'Productos Financieros',
        items: [
          {label: 'Agregar producto', icon: 'pi pi-plus', routerLink: ['/app/products/new']},
          {label: 'Listar productos', icon: 'pi pi-list', routerLink: ['/app/products/list']}
        ]
      }
    ];
  }
}
