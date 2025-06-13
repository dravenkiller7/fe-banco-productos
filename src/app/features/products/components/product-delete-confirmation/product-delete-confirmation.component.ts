import {Component, Inject} from '@angular/core';
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {ProductoFinancieroModel} from "../../models/producto-financiero.model";
import {DialogRef} from "../../../../shared/components/dialog/dialog-ref";
import {ProductService} from "../../services/product.service";
import {ToastService} from "../../../../shared/components/toast/toast.service";

@Component({
  selector: 'app-product-delete-confirmation',
  templateUrl: './product-delete-confirmation.component.html',
  styleUrl: './product-delete-confirmation.component.scss'
})
export class ProductDeleteConfirmationComponent {
  constructor(
    @Inject(DIALOG_DATA) public producto: ProductoFinancieroModel,
    public dialog: DialogRef,
    private productService: ProductService,
    private toastService: ToastService
  ) {
  }

  cerrar(): void {
    this.dialog.close(false);
  }

  eliminar(): void {
    this.productService.delete(this.producto.id).subscribe({
      next: data => {
        if (data) {
          this.toastService.show('warning', data.message!);
          this.dialog.close(true);
        }
      },
      error: err => {
        this.toastService.show('error', 'Error al eliminar el producto');
        this.dialog.close(false);
      }
    });
  }
}
