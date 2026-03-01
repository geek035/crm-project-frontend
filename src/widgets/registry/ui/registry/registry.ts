import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { Table, TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

import { RegistryFilterType } from '@widgets/registry/model/registry-config.model';
import { RegistryLoadParamsModel } from '@widgets/registry/model/registry-state.model';

import { Autocomplete } from '@shared/ui';

import { RegistryController } from './registry-controller';

@Component({
  selector: 'crm-registry',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    SkeletonModule,
    Autocomplete,
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

  private readonly controller = inject(RegistryController<T>);

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

  handleLazyLoad(params: RegistryLoadParamsModel): void {
    this.controller.load(params);
  }

  clear(dt: Table): void {
    dt.clear();
    this.searchValue.set('');
  }
}
