import { CompanyContactCreateDTO } from '@entities/company-contact';

import { NotValidValueError } from '@shared/lib';

import { CompanyContactCreateCommand } from '../model/commands/company-contact-create-command.model';

export function mapToCompanyContactCreateDTO(
  command: CompanyContactCreateCommand,
): CompanyContactCreateDTO {
  if (!command.individualID || !command.roleCode) {
    throw new NotValidValueError('Не валидные данные команды создания контакта компании');
  }

  return command;
}
