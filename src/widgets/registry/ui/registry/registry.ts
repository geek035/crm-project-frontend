import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

import { RegistryFilterType } from '@widgets/registry/model/registry-config.model';
import { RegistryLoadParamsModel } from '@widgets/registry/model/registry-state.model';

import { Autocomplete } from '@shared/ui';

import { RegistryController } from './registry-controller';

@Component({
  selector: 'crm-registry',
  imports: [CommonModule, FormsModule, TableModule, SkeletonModule, Autocomplete],
  templateUrl: './registry.html',
  styleUrl: './registry.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RegistryController],
})
export class Registry<T> {
  private readonly controller = inject(RegistryController<T>);

  columns = this.controller.columns;
  state = this.controller.state;
  data = this.controller.data;

  readonly filterType = RegistryFilterType;
  readonly areThereFilters = computed(
    () => this.columns().findIndex((column) => !!column.filter) >= 0,
  );

  handleLazyLoad(params: RegistryLoadParamsModel): void {
    this.controller.load(params);
  }
}
