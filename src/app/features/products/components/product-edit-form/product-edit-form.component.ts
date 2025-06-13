import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ProductoFinancieroModel} from "../../models/producto-financiero.model";
import {ProductService} from "../../services/product.service";
import {map, Observable} from "rxjs";
import {ToastService} from "../../../../shared/components/toast/toast.service";
import {mapProductFromBackend, mapProductToBackend} from "../../mapper/product-mapper";
import {FormValidators} from "../../utils/form-validators.util";

@Component({
  selector: 'app-product-edit-form',
  templateUrl: './product-edit-form.component.html',
  styleUrl: './product-edit-form.component.scss'
})
export class ProductEditFormComponent implements OnInit {
  @Input() modoEdicion = false;
  @Input() idProducto: string = '';

  @Output() onGuardar = new EventEmitter<void>();
  @Output() onCancelar = new EventEmitter<void>();

  form!: FormGroup;
  productoExistente!: ProductoFinancieroModel | null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.crearFormulario();
    if (this.modoEdicion && this.idProducto) {
      this.obtenerProducto();
    }
  }

  private obtenerProducto(): void {
    this.productService.read(this.idProducto).subscribe({
      next: response => {
        this.productoExistente = mapProductFromBackend(response);
        this.form.patchValue(this.productoExistente);
        this.form.get('id')?.disable();
      },
      error: error => {
        this.toastService.show('error', 'Error al obtener los datos del producto');
      }
    });
  }

  private crearFormulario(): void {
    const hoy = this.fechaActual();
    const revision = this.fechaUnAnioDespues(hoy);

    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [this.validarIdUnico.bind(this)]],
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      fechaLiberacion: [hoy, [Validators.required, FormValidators.fechaActual()]],
      fechaRevision: [{value: revision, disabled: true}, [Validators.required]]
    }, {
      validators: [FormValidators.fechaRevisionPosterior()]
    });

    this.form.get('fechaLiberacion')?.valueChanges.subscribe(valor => {
      if (!this.modoEdicion && valor) {
        const revisionCalculada = this.fechaUnAnioDespues(valor);
        this.form.get('fechaRevision')?.setValue(revisionCalculada);
      }
    });
  }

  private validarIdUnico(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.productService.verifyId(control.value).pipe(
      map(existe => existe ? {idDuplicado: true} : null)
    );
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const producto: ProductoFinancieroModel = {
      ...this.form.getRawValue(),
    };

    const request = this.modoEdicion
      ? this.productService.update(mapProductToBackend(producto), this.idProducto)
      : this.productService.create(mapProductToBackend(producto));

    request.subscribe({
      next: (response) => {
        this.toastService.show('success', response.message!);
        this.onGuardar.emit();
      },
      error: () => {
        this.toastService.show('error', 'Error al enviar el producto');
      }
    });
  }

  limpiar(): void {
    const hoy = this.fechaActual();
    const fechaRevision = this.fechaUnAnioDespues(hoy);

    if (this.modoEdicion && this.productoExistente) {
      this.form.reset({
        id: this.productoExistente.id, // se conserva
        nombre: this.productoExistente.nombre,
        descripcion: this.productoExistente.descripcion,
        logo: this.productoExistente.logo,
        fechaLiberacion: this.productoExistente.fechaLiberacion,
        fechaRevision: this.productoExistente.fechaRevision
      });
      this.form.get('id')?.disable();
    } else {
      this.form.reset({
        id: '',
        nombre: '',
        descripcion: '',
        logo: '',
        fechaLiberacion: hoy,
        fechaRevision
      });
    }
  }

  private fechaActual(): string {
    return new Date().toISOString().split('T')[0];
  }

  private fechaUnAnioDespues(fecha: string): string {
    const f = new Date(fecha);
    f.setFullYear(f.getFullYear() + 1);
    return f.toISOString().split('T')[0];
  }
}
