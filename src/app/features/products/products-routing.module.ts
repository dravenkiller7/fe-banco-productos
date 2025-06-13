import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProductListPageComponent} from "./pages/product-list-page/product-list-page.component";
import {ProductEditPageComponent} from "./pages/product-edit-page/product-edit-page.component";

const routes: Routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: 'list', component: ProductListPageComponent},
  {path: 'new', component: ProductEditPageComponent},
  {path: 'edit/:id', component: ProductEditPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}
