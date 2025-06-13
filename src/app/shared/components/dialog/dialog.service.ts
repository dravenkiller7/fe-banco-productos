import {Injectable, Injector} from '@angular/core';
import {ComponentType, Overlay} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {DIALOG_DATA} from '@angular/cdk/dialog';
import {DialogRef} from './dialog-ref';

export interface DialogConfig {
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public overlay: Overlay, public injector: Injector) {
  }

  public blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('overlay-blocked-scroll');
    } else {
      document.body.className += ' overlay-blocked-scroll';
    }
  }

  open<T>(component: ComponentType<T>, config?: DialogConfig): DialogRef {
    this.blockBodyScroll();
    // Globally centered position strategy
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    // Create the overlay with customizable options
    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      panelClass: 'overlay-panel',
    });

    // Create dialogRef to return
    const dialogRef = new DialogRef(overlayRef);

    // Create injector to be able to reference the DialogRef from within the component
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        {provide: DialogRef, useValue: dialogRef},
        {provide: DIALOG_DATA, useValue: config?.data},
      ],
    });

    // Attach component portal to the overlay
    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);
    return dialogRef;
  }
}
