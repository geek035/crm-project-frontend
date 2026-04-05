import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { isInvalidControl } from './is-invalid-control';

@Pipe({ name: 'isInvalidControl', pure: false })
export class IsInvalidControlPipe implements PipeTransform {
  transform(control: AbstractControl): boolean {
    console.log(isInvalidControl(control));
    return isInvalidControl(control);
  }
}
