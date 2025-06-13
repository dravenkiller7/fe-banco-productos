import {Component, OnInit} from "@angular/core";
import {ToastMessage, ToastService} from "./toast.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
})
export class ToastContainerComponent implements OnInit {
  mensajes: ToastMessage[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.mensajes$.subscribe((mensajes) => {
      this.mensajes = mensajes;
    });
  }
}
