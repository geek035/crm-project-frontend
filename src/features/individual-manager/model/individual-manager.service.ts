import { Injectable, inject } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, OperatorFunction } from 'rxjs';

import { IndividualAPIService, IndividualModel, IndividualsQueryDTO } from '@entities/individual';

import { NotPositiveOrZeroValueError, NotValidValueError } from '@shared/lib';
import { PageModel } from '@shared/model';

import {
  mapToIndividualAddDTO,
  mapToIndividualUpdateDTO,
} from '../lib/individual-manager-command.mapper';
import { IndividualAddCommand } from './commands/individual-add-command.model';
import { IndividualUpdateCommand } from './commands/individual-update-command.model';

interface IndividualManagerCommandOptions<S, E, R> {
  preprocessor: MonoTypeOperatorFunction<S>;
  apiProcessor: MonoTypeOperatorFunction<E>;
  postprocessor: OperatorFunction<E, R>;
}

@Injectable()
export class IndividualManagerService {
  private readonly individualAPI = inject(IndividualAPIService);

  getIndividualByID<R = IndividualModel>(
    id: IndividualModel['id'],
    options?: Pick<IndividualManagerCommandOptions<null, IndividualModel, R>, 'postprocessor'>,
  ): Observable<R> {
    if (!id) {
      throw new NotValidValueError('Не задан идентификатор физ. лица');
    }

    const handledOptions = this.handleProcessors(options);

    return this.individualAPI.getIndividualByID(id).pipe(handledOptions.postprocessor);
  }

  getIndividuals<R>(
    query: IndividualsQueryDTO,
    options?: Pick<
      IndividualManagerCommandOptions<null, PageModel<IndividualModel>, R>,
      'postprocessor'
    >,
  ): Observable<R> {
    if (query.pageNumber < 0 || query.pageSize < 0) {
      throw new NotPositiveOrZeroValueError();
    }

    if (!Array.isArray(query.sort) || !Array.isArray(query.filters)) {
      throw new NotValidValueError(`Значение сортировки или фильтрации не валидно`);
    }

    const handledOptions = this.handleProcessors(options);

    return this.individualAPI.getIndividuals(query).pipe(handledOptions.postprocessor);
  }

  addIndividual<R>(
    command: IndividualAddCommand,
    options?: Pick<IndividualManagerCommandOptions<null, string, R>, 'postprocessor'>,
  ): Observable<R> {
    const handledOptions = this.handleProcessors(options);
    const requestDTO = mapToIndividualAddDTO(command);

    return this.individualAPI.addIndividual(requestDTO).pipe(handledOptions.postprocessor);
  }

  updateIndividual<R>(
    id: IndividualModel['id'],
    command: IndividualUpdateCommand,
    options?: Pick<IndividualManagerCommandOptions<null, IndividualModel, R>, 'postprocessor'>,
  ): Observable<R> {
    if (!id) {
      throw new NotValidValueError('Не задан идентификатор физ. лица');
    }

    const handledOptions = this.handleProcessors(options);
    const requestDTO = mapToIndividualUpdateDTO(command);

    return this.individualAPI.updateIndividual(id, requestDTO).pipe(handledOptions.postprocessor);
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
