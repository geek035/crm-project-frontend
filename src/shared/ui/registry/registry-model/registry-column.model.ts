import { Tag } from 'primeng/tag';

import { RegistryFilterModel } from './registry-filter.model';

export enum RegistryColumnType {
  TEXT = 'text',
  EMAIL = 'email',
  PHONE = 'phone',
  DATE = 'date',
  TAG = 'tag',
  LINK = 'link',
}

export type RegistryColumnValueType = string | Date;

type RegistryColumnByType<T> =
  | { type: RegistryColumnType.TEXT }
  | { type: RegistryColumnType.DATE; format?: string }
  | { type: RegistryColumnType.EMAIL; mailTo?: (item: T) => string }
  | { type: RegistryColumnType.PHONE; tel?: (item: T) => string }
  | { type: RegistryColumnType.LINK; routerLink: string | ((item: T) => string | null) }
  | {
      type: RegistryColumnType.TAG;
      getSeverity?: (item: T) => Tag['severity'];
    };

export type RegistryColumnModel<T, TAdditional = keyof T> = {
  field: keyof T | TAdditional;
  header: string;
  disableSorting?: boolean;
  filter?: RegistryFilterModel<T>;
  get?: (item: T) => RegistryColumnValueType;
} & RegistryColumnByType<T>;
