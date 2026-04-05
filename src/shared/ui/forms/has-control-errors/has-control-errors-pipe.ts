import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { hasControlErrors } from './has-control-errors';

@Pipe({ name: 'hasControlErrors', pure: false })
export class HasControlErrorsPipe implements PipeTransform {
  transform(control: AbstractControl, errors: string[]): boolean {
    return hasControlErrors(control, errors);
  }
}
