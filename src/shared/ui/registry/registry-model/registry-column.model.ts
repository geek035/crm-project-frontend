import { RegistryFilterModel } from './registry-filter.model';

export enum RegistryColumnType {
  TEXT = 'text',
  EMAIL = 'email',
  PHONE = 'phone',
}

type RegistryColumnByType<T> =
  | { type: RegistryColumnType.TEXT }
  | { type: RegistryColumnType.EMAIL; mailTo?: (item: T) => string }
  | { type: RegistryColumnType.PHONE; tel?: (item: T) => string };

export type RegistryColumnModel<T> = {
  field: keyof T;
  header: string;
  disableSorting?: boolean;
  filter?: RegistryFilterModel;
} & RegistryColumnByType<T>;
