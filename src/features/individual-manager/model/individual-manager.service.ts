import { Injectable, inject } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, OperatorFunction } from 'rxjs';

import { IndividualAPIService } from '@entities/individual';

import { mapToIndividualAddDTO } from '../lib/individual-manager-command.mapper';
import { IndividualAddCommand } from './commands/individual-add-command.model';

interface IndividualManagerCommandOptions<S, E, R> {
  preprocessor: MonoTypeOperatorFunction<S>;
  apiProcessor: MonoTypeOperatorFunction<E>;
  postprocessor: OperatorFunction<E, R>;
}

@Injectable()
export class IndividualManagerService {
  private readonly individualAPI = inject(IndividualAPIService);

  addIndividual<R>(
    command: IndividualAddCommand,
    options?: Pick<IndividualManagerCommandOptions<null, string, R>, 'postprocessor'>,
  ): Observable<R> {
    const handledOptions = this.handleProcessors(options);
    const requestDTO = mapToIndividualAddDTO(command);

    return this.individualAPI.addIndividual(requestDTO).pipe(handledOptions.postprocessor);
  }

  private handleProcessors<S, E, R>(
    options?: Partial<IndividualManagerCommandOptions<S, E, R>>,
  ): IndividualManagerCommandOptions<S, E, R> {
    return {
      ...options,
      preprocessor: options?.preprocessor ?? ((source$) => source$),
      apiProcessor: options?.apiProcessor ?? ((source$) => source$),
      postprocessor: options?.postprocessor ?? ((source$) => source$ as unknown as Observable<R>),
    };
  }
}
