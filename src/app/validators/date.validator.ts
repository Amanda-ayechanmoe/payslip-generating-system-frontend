import { ValidatorFn, AbstractControl } from '@angular/forms';

export function DateMustNotGreaterThanToday(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }
    const date = new Date(control.value.year,control.value.month-1,control.value.day);
    return date.getTime() >= new Date().getTime() ? { greaterThanToday: true } : null;
  }
}