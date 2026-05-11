import { Injectable, inject } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, OperatorFunction } from 'rxjs';

import { CompanyAPIService, CompanyDTO } from '@entities/company';

import { NotPositiveOrZeroValueError, NotValidValueError } from '@shared/lib';
import { BaseQueryDTO, PageModel } from '@shared/model';

interface CompanyManagerCommandOptions<S, E, R> {
  preprocessor: MonoTypeOperatorFunction<S>;
  apiProcessor: MonoTypeOperatorFunction<E>;
  postprocessor: OperatorFunction<E, R>;
}

@Injectable()
export class CompanyManagerService {
  private readonly companyAPI = inject(CompanyAPIService);

  getIndividuals<R>(
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
