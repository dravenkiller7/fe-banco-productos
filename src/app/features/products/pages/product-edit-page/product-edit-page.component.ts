import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-edit-page',
  templateUrl: './product-edit-page.component.html',
  styleUrl: './product-edit-page.component.scss'
})
export class ProductEditPageComponent implements OnInit {
  modoEdicion = false;
  idProducto!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.modoEdicion = !!id;
      if (this.modoEdicion && id) {
        this.idProducto = id;
      }
    });
  }

  navegarListado(): void {
    this.router.navigate(['/app/products/list']);
  }
}
