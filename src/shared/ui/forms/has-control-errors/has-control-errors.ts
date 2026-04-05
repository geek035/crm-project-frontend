import { AbstractControl } from '@angular/forms';

export function hasControlErrors(control: AbstractControl, errors: string[]): boolean {
  return errors.some((error) => control.hasError(error));
}
