import { AbstractControl } from '@angular/forms';

export function isInvalidControl(control: AbstractControl): boolean {
  return !!control && control.invalid && (control.touched || control.dirty);
}
