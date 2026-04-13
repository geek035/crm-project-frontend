import { Pipe, PipeTransform } from '@angular/core';

interface InfoBlockFullnameAvailableType {
  firstName: string;
  secondName: string;
  surname: string | null;
}

export function getEntityFullname(
  entity: InfoBlockFullnameAvailableType | null | undefined,
): string | null {
  return !entity ? null : `${entity.secondName} ${entity.firstName} ${entity?.surname ?? ''}`;
}

@Pipe({ name: 'infoBlockFullname' })
export class InfoBlockFullnamePipe implements PipeTransform {
  transform(entity: InfoBlockFullnameAvailableType | null | undefined): string | null {
    return getEntityFullname(entity);
  }
}
