import { Pipe, PipeTransform } from '@angular/core';

import { FORM_ERRORS_DEFAULT_MESSAGES } from '@shared/lib';

@Pipe({ name: 'mapErrorsToMessage' })
export class MapErrorsToMessagePipe implements PipeTransform {
  transform(inputError: string[] | string): string | null {
    if (!inputError?.length) {
      return null;
    }

    const error = Array.isArray(inputError) ? inputError[0] : inputError;

    return FORM_ERRORS_DEFAULT_MESSAGES[error] ?? 'Ошибка валидации';
  }
}
