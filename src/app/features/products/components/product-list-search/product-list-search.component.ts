import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-product-list-search',
  templateUrl: './product-list-search.component.html',
  styleUrl: './product-list-search.component.scss'
})
export class ProductListSearchComponent {
  @Output() onSearch = new EventEmitter<string>();

  onSearchProduct(event: any): void {
    this.onSearch.emit(event.target.value);
  }
}
