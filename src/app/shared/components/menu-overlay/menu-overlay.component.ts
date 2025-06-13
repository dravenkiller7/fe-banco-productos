import {Component, Input} from '@angular/core';
import {MenuItemAction} from "./menu-item-action";
import {RouterLink} from "@angular/router";
import {CdkMenu, CdkMenuItem} from "@angular/cdk/menu";
import {CommonModule} from "@angular/common";
import {ProductoFinancieroModel} from "../../../features/products/models/producto-financiero.model";

@Component({
  selector: 'app-menu-overlay',
  standalone: true,
  imports: [
    RouterLink,
    CdkMenuItem,
    CdkMenu,
    CommonModule
  ],
  templateUrl: './menu-overlay.component.html'
})
export class AppMenuOverlayComponent {
  @Input() menuItems: MenuItemAction[] = [];
  @Input() product!: ProductoFinancieroModel;

  public executeCommand(action: MenuItemAction) {
    if (action.command) {
      action.command(this.product);
    }
  }
}
