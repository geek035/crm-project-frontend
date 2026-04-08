import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

import { Autocomplete } from '../../../controls/autocomplete/autocomplete';
import { RegistryColumnModel } from '../../registry-model/registry-column.model';
import {
  RegistryFilterModel,
  RegistryFilterType,
} from '../../registry-model/registry-filter.model';

@Component({
  selector: 'crm-registry-filter',
  imports: [Autocomplete, FormsModule, TableModule],
  templateUrl: './registry-filter.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistryFilter<T> {
  readonly column = input.required<RegistryColumnModel<T>>();

  readonly filterType = RegistryFilterType;

  public isAutocompleteFilter(
    filter: RegistryFilterModel | null | undefined,
  ): filter is Extract<RegistryFilterModel, { type: RegistryFilterType.AUTOCOMPLETE }> {
    return filter?.type === RegistryFilterType.AUTOCOMPLETE;
  }

  public isTextFilter(
    filter: RegistryFilterModel | null | undefined,
  ): filter is Extract<RegistryFilterModel, { type: RegistryFilterType.TEXT }> {
    return filter?.type === RegistryFilterType.TEXT;
  }
}
