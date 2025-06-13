import {OverlayRef} from '@angular/cdk/overlay';
import {Subject, Observable} from 'rxjs';

export class DialogRef {
    private afterClosedSubject = new Subject<any>();

    constructor(private overlayRef: OverlayRef) {
    }

    public close(result?: any) {
        this.unblockBodyScroll();
        this.overlayRef.dispose();
        this.afterClosedSubject.next(result);
        this.afterClosedSubject.complete();
    }

    public afterClosed(): Observable<any> {
        return this.afterClosedSubject.asObservable();
    }

    public unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('overlay-blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'overlay-blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }
}
