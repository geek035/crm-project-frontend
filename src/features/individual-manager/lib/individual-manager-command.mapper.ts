import { DateTime } from 'luxon';

import { IndividualAddDTO, IndividualUpdateDTO } from '@entities/individual';

import { NotValidDateError, NotValidValueError } from '@shared/lib';

import { IndividualAddCommand } from '../model/commands/individual-add-command.model';
import { IndividualUpdateCommand } from '../model/commands/individual-update-command.model';

export function mapToIndividualAddDTO(command: IndividualAddCommand): IndividualAddDTO {
  const birthdate = DateTime.fromJSDate(command.birthdate).toISODate();

  if (!birthdate) {
    throw new NotValidDateError();
  }

  if (!command.email || !command.firstName || !command.phoneNumber || command.secondName) {
    throw new NotValidValueError('Не валидные данные команды добавления физ. лица');
  }

  return {
    ...command,
    birthdate,
  };
}

export function mapToIndividualUpdateDTO(command: IndividualUpdateCommand): IndividualUpdateDTO {
  const birthdate = DateTime.fromJSDate(command.birthdate).toISODate();

  if (!birthdate) {
    throw new NotValidDateError();
  }

  if (!command.email || !command.firstName || !command.phoneNumber || !command.secondName) {
    throw new NotValidValueError('Не валидные данные команды обновления физ. лица');
  }

  return {
    ...command,
    birthdate,
  };
}
