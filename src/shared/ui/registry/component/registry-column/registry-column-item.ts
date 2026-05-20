import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';

import {
  RegistryColumnModel,
  RegistryColumnType,
  RegistryColumnValueType,
} from '../../registry-model/registry-column.model';

@Component({
  selector: 'crm-registry-column',
  imports: [CommonModule, RouterModule, TagModule],
  templateUrl: './registry-column-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistryColumnItem<T> {
  readonly column = input.required<RegistryColumnModel<T>>();
  readonly item = input.required<T>();

  readonly routerLink = computed(() => {
    const column = this.column();

    if (this.isLinkColumn(column)) {
      return typeof column.routerLink === 'string'
        ? column.routerLink
        : column.routerLink(this.item());
    }

    return null;
  });

  getValue(): RegistryColumnValueType {
    return this.column()?.get
      ? (this.column().get?.(this.item()) ?? '')
      : (this.item()[this.column().field] as RegistryColumnValueType);
  }

  isTextColumn(
    column: RegistryColumnModel<T> | null | undefined,
  ): column is Extract<RegistryColumnModel<T>, { type: RegistryColumnType.TEXT }> {
    return column?.type === RegistryColumnType.TEXT;
  }

  isLinkColumn(
    column: RegistryColumnModel<T> | null | undefined,
  ): column is Extract<RegistryColumnModel<T>, { type: RegistryColumnType.LINK }> {
    return column?.type === RegistryColumnType.LINK;
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
