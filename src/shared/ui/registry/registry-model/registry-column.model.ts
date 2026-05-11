import { Tag } from 'primeng/tag';

import { RegistryFilterModel } from './registry-filter.model';

export enum RegistryColumnType {
  TEXT = 'text',
  EMAIL = 'email',
  PHONE = 'phone',
  DATE = 'date',
  TAG = 'tag',
}

type RegistryColumnByType<T> =
  | { type: RegistryColumnType.TEXT }
  | { type: RegistryColumnType.DATE; format?: string }
  | { type: RegistryColumnType.EMAIL; mailTo?: (item: T) => string }
  | { type: RegistryColumnType.PHONE; tel?: (item: T) => string }
  | {
      type: RegistryColumnType.TAG;
      getValue?: (item: T) => string;
      getSeverity?: (item: T) => Tag['severity'];
    };

export type RegistryColumnModel<T> = {
  field: keyof T;
  header: string;
  disableSorting?: boolean;
  filter?: RegistryFilterModel<T>;
} & RegistryColumnByType<T>;
