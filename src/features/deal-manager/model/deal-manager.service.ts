import { Injectable, inject } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, OperatorFunction } from 'rxjs';

import {
  DealAPIService,
  DealChangeStageDTO,
  DealChangeStatusDTO,
  DealCreateDTO,
  DealDTO,
  DealStageCode,
  DealStatusCode,
  DealUpdateDTO,
} from '@entities/deal';

import { NotPositiveOrZeroValueError, NotValidValueError } from '@shared/lib';
import { BaseQueryDTO, PageModel } from '@shared/model';

interface DealManagerCommandOptions<S, E, R> {
  preprocessor: MonoTypeOperatorFunction<S>;
  apiProcessor: MonoTypeOperatorFunction<E>;
  postprocessor: OperatorFunction<E, R>;
}

@Injectable()
export class DealManagerService {
  private readonly dealAPI = inject(DealAPIService);

  createDeal<R = DealDTO['id']>(
    command: DealCreateDTO,
    options?: Pick<DealManagerCommandOptions<null, DealDTO['id'], R>, 'postprocessor'>,
  ): Observable<R> {
    if (
      !command.number ||
      !command.clientTypeCode ||
      !command.clientID ||
      !command.title ||
      !command.productCode ||
      !command.currencyCode ||
      !command.priorityCode ||
      !command.sourceCode
    ) {
      throw new NotValidValueError('Не валидные данные команды создания сделки');
    }

    if (command.amount < 0) {
      throw new NotPositiveOrZeroValueError();
    }

    const handledOptions = this.handleProcessors(options);

    return this.dealAPI.createDeal(command).pipe(handledOptions.postprocessor);
  }

  getDealByID<R = DealDTO>(
    id: DealDTO['id'],
    options?: Pick<DealManagerCommandOptions<null, DealDTO, R>, 'postprocessor'>,
  ): Observable<R> {
    if (!id) {
      throw new NotValidValueError('Не задан идентификатор сделки');
    }

    const handledOptions = this.handleProcessors(options);

    return this.dealAPI.findByID(id).pipe(handledOptions.postprocessor);
  }

  getDeals<R>(
    query: BaseQueryDTO,
    options?: Pick<DealManagerCommandOptions<null, PageModel<DealDTO>, R>, 'postprocessor'>,
  ): Observable<R> {
    if (query.pageNumber < 0 || query.pageSize < 0) {
      throw new NotPositiveOrZeroValueError();
    }

    if (!Array.isArray(query.sort) || !Array.isArray(query.filters)) {
      throw new NotValidValueError(`Значение сортировки или фильтрации не валидно`);
    }

    const handledOptions = this.handleProcessors(options);

    return this.dealAPI.findByParams(query).pipe(handledOptions.postprocessor);
  }

  updateDeal<R = DealDTO>(
    id: DealDTO['id'],
    command: DealUpdateDTO,
    options?: Pick<DealManagerCommandOptions<null, DealDTO, R>, 'postprocessor'>,
  ): Observable<R> {
    if (!id) {
      throw new NotValidValueError('Не задан идентификатор сделки');
    }

    if (!command.title || !command.priorityCode || !command.sourceCode) {
      throw new NotValidValueError('Не валидные данные команды обновления сделки');
    }

    const handledOptions = this.handleProcessors(options);

    return this.dealAPI.update(id, command).pipe(handledOptions.postprocessor);
  }

  changeStage<R = DealDTO>(
    id: DealDTO['id'],
    command: DealChangeStageDTO,
    options?: Pick<DealManagerCommandOptions<null, DealDTO, R>, 'postprocessor'>,
  ): Observable<R> {
    if (!id) {
      throw new NotValidValueError('Не задан идентификатор сделки');
    }

    if (!command.stageCode) {
      throw new NotValidValueError('Не задан этап сделки');
    }

    if (this.isStageCloseInfoRequired(command.stageCode) && !command.closeInfo) {
      throw new NotValidValueError('Не задана причина закрытия сделки');
    }

    const handledOptions = this.handleProcessors(options);
    const payload: DealChangeStageDTO = {
      ...command,
      closeInfo: this.isStageCloseInfoRequired(command.stageCode) ? command.closeInfo : null,
    };

    return this.dealAPI.changeStage(id, payload).pipe(handledOptions.postprocessor);
  }

  changeStatus<R = DealDTO>(
    id: DealDTO['id'],
    command: DealChangeStatusDTO,
    options?: Pick<DealManagerCommandOptions<null, DealDTO, R>, 'postprocessor'>,
  ): Observable<R> {
    if (!id) {
      throw new NotValidValueError('Не задан идентификатор сделки');
    }

    if (!command.statusCode) {
      throw new NotValidValueError('Не задан статус сделки');
    }

    if (this.isStatusCloseInfoRequired(command.statusCode) && !command.closeInfo) {
      throw new NotValidValueError('Не задана причина закрытия сделки');
    }

    const handledOptions = this.handleProcessors(options);
    const payload: DealChangeStatusDTO = {
      ...command,
      closeInfo: this.isStatusCloseInfoRequired(command.statusCode) ? command.closeInfo : null,
    };

    return this.dealAPI.changeStatus(id, payload).pipe(handledOptions.postprocessor);
  }

  private isStageCloseInfoRequired(stageCode: DealStageCode): boolean {
    return stageCode === DealStageCode.CANCELLED || stageCode === DealStageCode.LOST;
  }

  private isStatusCloseInfoRequired(statusCode: DealStatusCode): boolean {
    return statusCode === DealStatusCode.CANCELLED || statusCode === DealStatusCode.FAILED;
  }

  private handleProcessors<S, E, R>(
    options?: Partial<DealManagerCommandOptions<S, E, R>>,
  ): DealManagerCommandOptions<S, E, R> {
    return {
      ...options,
      preprocessor: options?.preprocessor ?? ((source$) => source$),
      apiProcessor: options?.apiProcessor ?? ((source$) => source$),
      postprocessor: options?.postprocessor ?? ((source$) => source$ as unknown as Observable<R>),
    };
  }
}
