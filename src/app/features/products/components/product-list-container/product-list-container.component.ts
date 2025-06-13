import {Component, OnInit} from '@angular/core';
import {ProductoFinancieroModel} from "../../models/producto-financiero.model";
import {ProductService} from "../../services/product.service";
import {ToastService} from "../../../../shared/components/toast/toast.service";
import {mapProductFromBackend} from "../../mapper/product-mapper";

@Component({
  selector: 'app-product-list-container',
  templateUrl: './product-list-container.component.html',
  styleUrl: './product-list-container.component.scss'
})
export class ProductListContainerComponent implements OnInit {
  productosOriginal: ProductoFinancieroModel[] = [];
  productosFiltrados: ProductoFinancieroModel[] = [];

  cantidadPorPagina: number = 5;
  terminoBusqueda: string = '';

  constructor(
    private productService: ProductService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productService.getList().subscribe({
      next: (response) => {
        this.productosOriginal = response.data.map((p: any) => mapProductFromBackend(p));
        this.filtrarYPaginar();
      },
      error: () => {
        this.toastService.show('error', 'Error al listar los productos');
      }
    });
  }

  onBuscar(valor: string): void {
    this.terminoBusqueda = valor;
    this.filtrarYPaginar();
  }

  onCambiarCantidad(valor: number): void {
    this.cantidadPorPagina = valor;
    this.filtrarYPaginar();
  }

  filtrarYPaginar(): void {
    const filtrados = this.filtrarProductos(this.productosOriginal, this.terminoBusqueda);
    this.productosFiltrados = filtrados.slice(0, this.cantidadPorPagina);
  }

  get totalResultados(): number {
    return this.filtrarProductos(this.productosOriginal, this.terminoBusqueda).length;
  }

  private filtrarProductos(productos: ProductoFinancieroModel[], termino: string): ProductoFinancieroModel[] {
    const t = termino.toLowerCase().trim();
    return productos.filter(p =>
      p.nombre.toLowerCase().includes(t) ||
      p.id.toLowerCase().includes(t) ||
      p.descripcion.toLowerCase().includes(t) ||
      p.fechaLiberacion.toLowerCase().includes(t) ||
      p.fechaRevision.toLowerCase().includes(t)
    );
  }
}
