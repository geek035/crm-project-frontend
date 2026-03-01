import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

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
    RouterLink,
  ],
  templateUrl: './registry.html',
  styleUrl: './registry.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RegistryController],
})
export class Registry<T> {
  private static nextId = 0;

  private readonly controller = inject(RegistryController<T>);

  readonly rowsPerPageOptions = input<number[]>([5, 10, 20]);
  readonly dataKey = input<string | undefined>('id');

  selectedValue: T | null = null;

  readonly data = this.controller.data;
  readonly state = this.controller.state;
  readonly columns = this.controller.columns;
  readonly commands = this.controller.commands;

  readonly filterType = RegistryFilterType;
  readonly tableCaptionActionsId = `registry-actions-${Registry.nextId++}`;

  readonly tableCommands = computed(
    () => (this.selectedValue ? this.commands()?.specific : this.commands()?.general) || [],
  );

  readonly areThereFilters = computed(
    () => this.columns().findIndex((column) => !!column.filter) >= 0,
  );

  handleLazyLoad(params: RegistryLoadParamsModel): void {
    this.controller.load(params);
  }
}
