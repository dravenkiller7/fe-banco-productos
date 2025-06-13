import {Component, Input, ViewChild} from '@angular/core';
import {ProductoFinancieroModel} from "../../models/producto-financiero.model";
import {Router} from "@angular/router";
import {MenuItemAction} from "../../../../shared/components/menu-overlay/menu-item-action";
import {DialogService} from "../../../../shared/components/dialog/dialog.service";
import {DialogRef} from "../../../../shared/components/dialog/dialog-ref";
import {ProductDeleteConfirmationComponent} from "../product-delete-confirmation/product-delete-confirmation.component";
import {ProductListContainerComponent} from "../product-list-container/product-list-container.component";

@Component({
  selector: 'app-product-list-table',
  templateUrl: './product-list-table.component.html',
  styleUrl: './product-list-table.component.scss'
})
export class ProductListTableComponent {
  @Input() productos: ProductoFinancieroModel[] = [];
  @ViewChild(ProductListContainerComponent) productList!: ProductListContainerComponent;
  productMenuItems: MenuItemAction[] = [];

  private dialogRef!: DialogRef;

  constructor(
    private router: Router,
    private dialogService: DialogService
  ) {
    this.setUpProductMenuItems();
  }

  private setUpProductMenuItems() {
    this.productMenuItems = [
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: (element) => {
          this.editarProducto(element);
        }
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: (element) => {
          this.eliminarProducto(element);
        }
      }
    ];
  }

  editarProducto(producto: ProductoFinancieroModel): void {
    this.router.navigate(['/app/products/edit', producto.id]);
  }

  eliminarProducto(producto: ProductoFinancieroModel): void {
    this.dialogRef = this.dialogService.open(ProductDeleteConfirmationComponent, {
      data: producto
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }
}
