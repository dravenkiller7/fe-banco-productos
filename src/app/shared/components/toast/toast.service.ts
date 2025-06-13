import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface ToastMessage {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private mensajesSubject = new BehaviorSubject<ToastMessage[]>([]);
  mensajes$ = this.mensajesSubject.asObservable();

  show(type: ToastMessage['type'], message: string): void {
    const mensajesActuales = this.mensajesSubject.value;
    const nuevo = [...mensajesActuales, {type, message}];
    this.mensajesSubject.next(nuevo);

    setTimeout(() => this.removeFirst(), 3000);
  }

  private removeFirst(): void {
    const [, ...rest] = this.mensajesSubject.value;
    this.mensajesSubject.next(rest);
  }
}
