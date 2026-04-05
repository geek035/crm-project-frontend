import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EMPTY, catchError, throwError } from 'rxjs';

import { isWebErrorModel } from '@shared/model';

import { HTTP_ERROR_BYPASS_CONTEXT_TOKEN } from './http-error-bypass-context.token';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((responseError: HttpErrorResponse) => {
      if (!req.context.get(HTTP_ERROR_BYPASS_CONTEXT_TOKEN)) {
        handleHttpErrorsResponse(responseError);

        return EMPTY;
      }

      return throwError(() => responseError);
    }),
  );

  function handleHttpErrorsResponse(responseError: HttpErrorResponse): void {
    if (responseError.status === 0) {
      messageService.add({
        severity: 'error',
        closable: true,
        sticky: true,
        summary: 'Ошибка сети',
        detail: 'Не удалось выполнить запрос. Проверьте соединение с сетью.',
      });

      return;
    }

    const rawError = responseError.error;

    if (!isWebErrorModel(rawError)) {
      messageService.add({
        severity: 'error',
        closable: true,
        sticky: true,
        summary: `Ошибка ${responseError.status}`,
        detail: 'Произошла непредвиденная ошибка.',
      });

      return;
    }

    const [firstMessage, ...otherMessages] = rawError.messages ?? [];

    messageService.add({
      severity: 'error',
      closable: true,
      sticky: true,
      summary: rawError.title || `Ошибка ${responseError.status}`,
      detail: firstMessage || 'Произошла ошибка',
    });

    otherMessages.forEach((message) => {
      messageService.add({
        severity: 'error',
        closable: true,
        sticky: true,
        detail: message,
      });
    });
  }
};
