import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { Table, TableLazyLoadEvent, TableModule, TableRowSelectEvent } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

import { CRMErrorModel } from '@shared/model';
import { CRM_TOAST_KEY } from '@shared/ui/notifications/crm-toast-key.const';

import { RegistryFilterType } from '../registry-model/registry-filter.model';
import { RegistryColumnItem } from './registry-column/registry-column-item';
import { RegistryCommand } from './registry-command/registry-command';
import { RegistryController } from './registry-controller';
import { RegistryFilter } from './registry-filter/registry-filter';

@Component({
  selector: 'crm-registry',
  imports: [
    RegistryColumnItem,
    RegistryFilter,
    RegistryCommand,
    CommonModule,
    FormsModule,
    TableModule,
    SkeletonModule,
    ButtonModule,
    RouterModule,
    FluidModule,
    ToolbarModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ContextMenuModule,
  ],
  templateUrl: './registry.html',
  styleUrl: './registry.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RegistryController],
})
export class Registry<T> {
  private static nextId = 0;

  readonly useFullPageClass = input(true);

  private readonly controller = inject(RegistryController<T>);
  private readonly messageService = inject(MessageService);

  readonly data = this.controller.data;
  readonly state = this.controller.state;
  readonly columns = this.controller.columns;
  readonly commands = this.controller.commands;
  readonly contextMenu = this.controller.contextMenu;
  readonly stateSaving = this.controller.stateSaving;
  readonly generalSettings = this.controller.generalSettings;

  readonly filterType = RegistryFilterType;
  readonly tableCaptionActionsId = `registry-actions-${Registry.nextId++}`;

  readonly selectedValue = model<T | null>(null);
  readonly searchValue = model<string>('');
  readonly tableCommands = computed(
    () => (this.selectedValue() ? this.commands()?.specific : this.commands()?.general) || [],
  );

  readonly areThereFilters = computed(
    () => this.columns().findIndex((column) => !!column.filter) >= 0,
  );

  constructor() {
    effect(() => {
      const state = this.state();

      if (state.status === 'error') {
        this.handledError(state.error);
      }
    });
  }

  handleLazyLoad(tableLazyLoadEvent: TableLazyLoadEvent): void {
    this.controller.load(tableLazyLoadEvent);
  }

  handleDoubleClickOnRow(event: TableRowSelectEvent): void {
    console.log(event);
  }

  handledError(error: CRMErrorModel): void {
    this.messageService.add({
      key: CRM_TOAST_KEY,
      summary: error.title,
      detail: error.message,
      severity: 'error',
      sticky: true,
    });
  }

  clear(dt: Table): void {
    dt.clear();
    dt.clearFilterValues();
    dt.clearState();
    this.searchValue.set('');
  }
}
