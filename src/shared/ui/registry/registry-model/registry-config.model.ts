import { MenuItem } from 'primeng/api';

import { RegistryColumnModel } from './registry-column.model';
import { RegistryCommandModel } from './registry-command.model';

export interface RegistryConfigModel<T, TAdditional = keyof T> {
  dataKey?: string;
  defaultSortField?: keyof T;
  rowsPerPageOptions?: number[];
  showSearch?: boolean;
  columns: RegistryColumnModel<T, TAdditional>[];
  contextMenu?: MenuItem[];
  commands?: {
    general?: RegistryCommandModel<T>[];
    specific?: RegistryCommandModel<T>[];
  };
  stateSaving?: {
    key: string;
    storage: 'session' | 'local';
  };
}

export interface RegistryContentModel<T> {
  total: number;
  data: T[];
}
