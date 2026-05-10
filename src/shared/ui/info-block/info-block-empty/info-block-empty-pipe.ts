import { Pipe, PipeTransform } from '@angular/core';

import { isNotNullOrUndefined } from '@shared/lib';

@Pipe({ name: 'infoBlockEmpty' })
export class InfoBlockEmptyPipe implements PipeTransform {
  transform<T>(value: T, fallback = '-'): unknown {
    return isNotNullOrUndefined(value) ? value : fallback;
  }
}
