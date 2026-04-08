import { DateTime } from 'luxon';

import { IndividualAddDTO } from '@entities/individual';

import { NotValidDateError } from '@shared/lib';

import { IndividualAddCommand } from '../model/commands/individual-add-command.model';

export function mapToIndividualAddDTO(command: IndividualAddCommand): IndividualAddDTO {
  const birthdate = DateTime.fromJSDate(command.birthdate).toISODate();

  if (!birthdate) {
    throw new NotValidDateError();
  }

  return {
    ...command,
    birthdate,
  };
}
