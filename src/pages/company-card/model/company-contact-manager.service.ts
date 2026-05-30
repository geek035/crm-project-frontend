import { Injectable, inject } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, OperatorFunction, filter, switchMap } from 'rxjs';

import { NotValidValueError } from '@shared/lib';
import { ConfirmationDialogService } from '@shared/ui';
import { getEntityFullname } from '@shared/ui/info-block';

import { CompanyContactAPIService } from '../api/company-contact-api.service';
import { mapToCompanyContactCreateDTO } from '../lib/company-contact-manager-command.mapper';
import { CompanyContactCreateCommand } from './commands/company-contact-create-command.model';
import { CompanyContactDTO } from './company-contact-dto.model';
import { CompanyContactRoleCode } from './company-contact-role-code.enum';
import { CompanyContactStatusCode } from './company-contact-status-code';

interface CompanyContactManagerCommandOptions<S, E, R> {
  preprocessor: MonoTypeOperatorFunction<S>;
  apiProcessor: MonoTypeOperatorFunction<E>;
  postprocessor: OperatorFunction<E, R>;
}

@Injectable()
export class CompanyContactManagerService {
  private readonly companyContactAPI = inject(CompanyContactAPIService);
  private readonly confirmationDialogService = inject(ConfirmationDialogService);

  addContact<R>(
    companyID: string,
    command: CompanyContactCreateCommand,
    options?: Pick<CompanyContactManagerCommandOptions<null, string, R>, 'postprocessor'>,
  ): Observable<R> {
    if (!companyID) {
      throw new NotValidValueError('Не задан идентификатор компании');
    }

    const handledOptions = this.handleProcessors(options);
    const requestDTO = mapToCompanyContactCreateDTO(command);

    return this.companyContactAPI
      .addContact(companyID, requestDTO)
      .pipe(handledOptions.postprocessor);
  }

  deleteContact<R>(
    companyID: string,
    contact: CompanyContactDTO,
    options?: Partial<Omit<CompanyContactManagerCommandOptions<null, void, R>, 'preprocessor'>>,
  ): Observable<R> {
    if (!companyID) {
      throw new NotValidValueError('Не задан идентификатор компании');
    }

    if (!contact?.id) {
      throw new NotValidValueError('Не задан идентификатор контакта');
    }

    const handledOptions = this.handleProcessors(options);
    const fullname = getEntityFullname(contact.individual) ?? 'выбранный контакт';

    return this.confirmationDialogService
      .confirm({
        header: 'Удаление контакта',
        label: `Удалить контакт "${fullname}"?`,
      })
      .pipe(
        filter(Boolean),
        switchMap(() =>
          this.companyContactAPI
            .deleteContact(companyID, contact.id)
            .pipe(handledOptions.apiProcessor),
        ),
        handledOptions.postprocessor,
      );
  }

  updateRole<R>(
    companyID: string,
    contact: CompanyContactDTO,
    roleCode: CompanyContactRoleCode,
    options?: Partial<
      Omit<CompanyContactManagerCommandOptions<null, CompanyContactDTO, R>, 'preprocessor'>
    >,
  ): Observable<R> {
    if (!companyID) {
      throw new NotValidValueError('Не задан идентификатор компании');
    }

    if (!contact?.id) {
      throw new NotValidValueError('Не задан идентификатор контакта');
    }

    if (!roleCode) {
      throw new NotValidValueError('Не задана роль контакта');
    }

    const handledOptions = this.handleProcessors(options);

    return this.companyContactAPI
      .updateRole(companyID, contact.id, { roleCode })
      .pipe(handledOptions.apiProcessor, handledOptions.postprocessor);
  }

  updateStatus<R>(
    companyID: string,
    contact: CompanyContactDTO,
    statusCode: CompanyContactStatusCode,
    options?: Partial<
      Omit<CompanyContactManagerCommandOptions<null, CompanyContactDTO, R>, 'preprocessor'>
    >,
  ): Observable<R> {
    if (!companyID) {
      throw new NotValidValueError('Не задан идентификатор компании');
    }

    if (!contact?.id) {
      throw new NotValidValueError('Не задан идентификатор контакта');
    }

    if (!statusCode) {
      throw new NotValidValueError('Не задан статус контакта');
    }

    const handledOptions = this.handleProcessors(options);

    return this.companyContactAPI
      .updateStatus(companyID, contact.id, { statusCode })
      .pipe(handledOptions.apiProcessor, handledOptions.postprocessor);
  }

  private handleProcessors<S, E, R>(
    options?: Partial<CompanyContactManagerCommandOptions<S, E, R>>,
  ): CompanyContactManagerCommandOptions<S, E, R> {
    return {
      ...options,
      preprocessor: options?.preprocessor ?? ((source$) => source$),
      apiProcessor: options?.apiProcessor ?? ((source$) => source$),
      postprocessor: options?.postprocessor ?? ((source$) => source$ as unknown as Observable<R>),
    };
  }
}
