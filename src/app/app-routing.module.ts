import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppLayoutComponent} from "./layout/components/app.layout.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', redirectTo: 'app/products/list', pathMatch: 'full'},
      {
        path: 'app', component: AppLayoutComponent,
        children: [
          {
            path: 'products',
            loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule)
          },
        ]
      },
    ], {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
