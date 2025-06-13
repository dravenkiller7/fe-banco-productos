import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ProductsRoutingModule} from './products-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {ProductListContainerComponent} from "./components/product-list-container/product-list-container.component";
import {ProductListSearchComponent} from "./components/product-list-search/product-list-search.component";
import {ProductListPaginationComponent} from "./components/product-list-pagination/product-list-pagination.component";
import {ProductListTableComponent} from "./components/product-list-table/product-list-table.component";
import {ProductListPageComponent} from "./pages/product-list-page/product-list-page.component";
import {ProductEditPageComponent} from "./pages/product-edit-page/product-edit-page.component";
import {ProductEditFormComponent} from "./components/product-edit-form/product-edit-form.component";
import {CdkMenuTrigger} from "@angular/cdk/menu";
import {AppMenuOverlayComponent} from "../../shared/components/menu-overlay/menu-overlay.component";
import {
  ProductDeleteConfirmationComponent
} from "./components/product-delete-confirmation/product-delete-confirmation.component";

@NgModule({
  declarations: [
    ProductListPageComponent,
    ProductListContainerComponent,
    ProductListSearchComponent,
    ProductListPaginationComponent,
    ProductListTableComponent,
    ProductEditPageComponent,
    ProductEditFormComponent,
    ProductDeleteConfirmationComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    CdkMenuTrigger,
    AppMenuOverlayComponent
  ]
})
export class ProductsModule {
}
