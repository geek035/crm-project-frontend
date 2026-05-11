import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TagModule } from 'primeng/tag';

import {
  RegistryColumnModel,
  RegistryColumnType,
} from '../../registry-model/registry-column.model';

@Component({
  selector: 'crm-registry-column',
  imports: [CommonModule, TagModule],
  templateUrl: './registry-column-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistryColumnItem<T> {
  readonly column = input.required<RegistryColumnModel<T>>();
  readonly item = input.required<T>();

  isTextColumn(
    column: RegistryColumnModel<T> | null | undefined,
  ): column is Extract<RegistryColumnModel<T>, { type: RegistryColumnType.TEXT }> {
    return column?.type === RegistryColumnType.TEXT;
  }

  isEmailColumn(
    column: RegistryColumnModel<T> | null | undefined,
  ): column is Extract<RegistryColumnModel<T>, { type: RegistryColumnType.EMAIL }> {
    return column?.type === RegistryColumnType.EMAIL;
  }

  isPhoneColumn(
    column: RegistryColumnModel<T> | null | undefined,
  ): column is Extract<RegistryColumnModel<T>, { type: RegistryColumnType.PHONE }> {
    return column?.type === RegistryColumnType.PHONE;
  }

  isDateColumn(
    column: RegistryColumnModel<T> | null | undefined,
  ): column is Extract<RegistryColumnModel<T>, { type: RegistryColumnType.DATE }> {
    return column?.type === RegistryColumnType.DATE;
  }

  isTagColumn(
    column: RegistryColumnModel<T> | null | undefined,
  ): column is Extract<RegistryColumnModel<T>, { type: RegistryColumnType.TAG }> {
    return column?.type === RegistryColumnType.TAG;
  }
}
