import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppLayoutModule} from "./layout/components/app.layout.module";
import {ToastContainerComponent} from "./shared/components/toast/toast-container.component";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        ToastContainerComponent
    ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
