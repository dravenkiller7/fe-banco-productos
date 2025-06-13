import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-product-list-pagination',
  templateUrl: './product-list-pagination.component.html',
  styleUrl: './product-list-pagination.component.scss'
})
export class ProductListPaginationComponent {
  @Input() totalResultados: number = 0;
  @Input() resultadosMostrados: number = 0;
  @Input() opciones: number[] = [5, 10, 20];
  @Output() onChange = new EventEmitter<number>();

  onChangePage(event: any) {
    this.onChange.emit(+event.target.value);
  }

}
