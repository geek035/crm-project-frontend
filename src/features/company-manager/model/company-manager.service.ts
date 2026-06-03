import { Injectable, inject } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, OperatorFunction } from 'rxjs';

import { CompanyAPIService, CompanyDTO, CompanyLifecycleStatusCode } from '@entities/company';

import { NotPositiveOrZeroValueError, NotValidValueError } from '@shared/lib';
import { BaseQueryDTO, PageModel } from '@shared/model';

import {
  mapToCompanyCreateDTO,
  mapToCompanyUpdateDTO,
} from '../lib/company-manager-command.mapper';
import { CompanyCreateCommand } from './commands/company-create-command.model';
import { CompanyUpdateCommand } from './commands/company-update-command.model';

interface CompanyManagerCommandOptions<S, E, R> {
  preprocessor: MonoTypeOperatorFunction<S>;
  apiProcessor: MonoTypeOperatorFunction<E>;
  postprocessor: OperatorFunction<E, R>;
}

@Injectable()
export class CompanyManagerService {
  private readonly companyAPI = inject(CompanyAPIService);

  getCompanyByID<R = CompanyDTO>(
    id: CompanyDTO['id'],
    options?: Pick<CompanyManagerCommandOptions<null, CompanyDTO, R>, 'postprocessor'>,
  ): Observable<R> {
    if (!id) {
      throw new NotValidValueError('Не задан идентификатор компании');
    }

    const handledOptions = this.handleProcessors(options);

    return this.companyAPI.getCompanyByID(id).pipe(handledOptions.postprocessor);
  }

  getCompanies<R>(
    query: BaseQueryDTO,
    options?: Pick<CompanyManagerCommandOptions<null, PageModel<CompanyDTO>, R>, 'postprocessor'>,
  ): Observable<R> {
    if (query.pageNumber < 0 || query.pageSize < 0) {
      throw new NotPositiveOrZeroValueError();
    }

    if (!Array.isArray(query.sort) || !Array.isArray(query.filters)) {
      throw new NotValidValueError(`Значение сортировки или фильтрации не валидно`);
    }

    const handledOptions = this.handleProcessors(options);

    return this.companyAPI.getCompanies(query).pipe(handledOptions.postprocessor);
  }

  createCompany<R>(
    command: CompanyCreateCommand,
    options?: Pick<CompanyManagerCommandOptions<null, string, R>, 'postprocessor'>,
  ): Observable<R> {
    const handledOptions = this.handleProcessors(options);
    const requestDTO = mapToCompanyCreateDTO(command);

    return this.companyAPI.createCompany(requestDTO).pipe(handledOptions.postprocessor);
  }

  updateCompany<R>(
    id: CompanyDTO['id'],
    command: CompanyUpdateCommand,
    options?: Pick<CompanyManagerCommandOptions<null, CompanyDTO, R>, 'postprocessor'>,
  ): Observable<R> {
    if (!id) {
      throw new NotValidValueError('Не задан идентификатор компании');
    }

    const handledOptions = this.handleProcessors(options);
    const requestDTO = mapToCompanyUpdateDTO(command);

    return this.companyAPI.updateCompany(id, requestDTO).pipe(handledOptions.postprocessor);
  }

  updateLifecycle<R>(
    id: CompanyDTO['id'],
    lifecycleCode: CompanyLifecycleStatusCode,
    options?: Pick<CompanyManagerCommandOptions<null, CompanyDTO, R>, 'postprocessor'>,
  ): Observable<R> {
    if (!id) {
      throw new NotValidValueError('Не задан идентификатор компании');
    }

    if (!lifecycleCode) {
      throw new NotValidValueError('Не задан статус жизненного цикла компании');
    }

    const handledOptions = this.handleProcessors(options);

    return this.companyAPI
      .updateLifecycle(id, { lifecycleCode })
      .pipe(handledOptions.postprocessor);
  }

  private handleProcessors<S, E, R>(
    options?: Partial<CompanyManagerCommandOptions<S, E, R>>,
  ): CompanyManagerCommandOptions<S, E, R> {
    return {
      ...options,
      preprocessor: options?.preprocessor ?? ((source$) => source$),
      apiProcessor: options?.apiProcessor ?? ((source$) => source$),
      postprocessor: options?.postprocessor ?? ((source$) => source$ as unknown as Observable<R>),
    };
  }
}
