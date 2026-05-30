import { NotValidValueError } from '@shared/lib';

import { CompanyContactCreateCommand } from '../model/commands/company-contact-create-command.model';
import { CompanyContactCreateDTO } from '../model/company-contact-request.model';

export function mapToCompanyContactCreateDTO(
  command: CompanyContactCreateCommand,
): CompanyContactCreateDTO {
  if (!command.individualID || !command.roleCode) {
    throw new NotValidValueError('Не валидные данные команды создания контакта компании');
  }

  return command;
}
