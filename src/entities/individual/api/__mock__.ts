import { DateTime } from 'luxon';

import { IndividualModel } from '../model/individual.model';

export const MOCK_INDIVIDUAL: IndividualModel = {
  id: 'id',
  firstName: 'firstName',
  secondName: 'secondName',
  surname: null,
  birthdate: DateTime.now().toISO(),
  email: 'example@mail.com',
  phoneNumber: '81231211',
};
