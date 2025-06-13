import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListTableComponent } from './product-list-table.component';

describe('ProductListTableComponent', () => {
  let component: ProductListTableComponent;
  let fixture: ComponentFixture<ProductListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar productos en la tabla', () => {
    component.productos = [{
      id: '1',
      nombre: 'Producto A',
      descripcion: 'Desc',
      logo: 'logo.png',
      fechaLiberacion: '2025-01-01',
      fechaRevision: '2026-01-01'
    }];
    fixture.detectChanges();

    const filas = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(filas.length).toBe(1);
    expect(filas[0].textContent).toContain('Producto A');
  });

  it('debería mostrar mensaje si no hay productos', () => {
    component.productos = [];
    fixture.detectChanges();

    const mensaje = fixture.nativeElement.querySelector('.tabla-vacia');
    expect(mensaje).toBeTruthy();
    expect(mensaje.textContent).toContain('No hay productos');
  });
});
