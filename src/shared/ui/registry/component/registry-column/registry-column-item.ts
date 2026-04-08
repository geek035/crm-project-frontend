import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import {
  RegistryColumnModel,
  RegistryColumnType,
} from '../../registry-model/registry-column.model';

@Component({
  selector: 'crm-registry-column',
  imports: [],
  templateUrl: './registry-column-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistryColumnItem<T> {
  readonly column = input.required<RegistryColumnModel<T>>();
  readonly item = input.required<T>();

  readonly columnType = RegistryColumnType;
}
