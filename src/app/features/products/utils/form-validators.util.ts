import {AbstractControl, ValidationErrors, ValidatorFn, FormGroup} from '@angular/forms';

export class FormValidators {
  static fechaActual(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hoy = new Date().toISOString().split('T')[0];
      return control.value >= hoy ? null : {fechaInvalida: true};
    };
  }

  static fechaRevisionPosterior(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const f1 = group.get('fechaLiberacion')?.value;
      const f2 = group.get('fechaRevision')?.value;

      if (!f1 || !f2) return null;

      const fechaEsperada = new Date(f1);
      fechaEsperada.setFullYear(fechaEsperada.getFullYear() + 1);
      return f2 === fechaEsperada.toISOString().split('T')[0]
        ? null
        : {revisionInvalida: true};
    };
  }
}
