import { CompanyCreateDTO } from '@entities/company';

import { NotValidValueError } from '@shared/lib';

import { CompanyCreateCommand } from '../model/commands/company-create-command.model';

export function mapToCompanyCreateDTO(command: CompanyCreateCommand): CompanyCreateDTO {
  if (
    !command.officialName ||
    !command.commercialName ||
    !command.inn ||
    !command.kpp ||
    !command.clientSegment
  ) {
    throw new NotValidValueError('Не валидные данные команды создания компании');
  }

  return {
    officialName: command.officialName,
    commercialName: command.commercialName,
    inn: command.inn,
    kpp: command.kpp,
    clientSegmentCode: command.clientSegment.code,
    registeredAddress: {
      ...command.registeredAddress,
      office: command.registeredAddress.office ?? '',
    },
  };
}
