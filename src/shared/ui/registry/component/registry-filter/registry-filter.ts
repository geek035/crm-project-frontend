import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

import { CRMFilterMatchMode } from '@shared/model';

import { Autocomplete } from '../../../controls/autocomplete/autocomplete';
import { Multiselect } from '../../../controls/multiselect/multiselect';
import { RegistryColumnModel } from '../../registry-model/registry-column.model';
import {
  RegistryFilterModel,
  RegistryFilterType,
} from '../../registry-model/registry-filter.model';

@Component({
  selector: 'crm-registry-filter',
  imports: [Autocomplete, Multiselect, FormsModule, TableModule],
  templateUrl: './registry-filter.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistryFilter<T> {
  readonly column = input.required<RegistryColumnModel<T>>();

  readonly matchMode = CRMFilterMatchMode;

  isAutocompleteFilter(
    filter: RegistryFilterModel<T> | null | undefined,
  ): filter is Extract<RegistryFilterModel<T>, { type: RegistryFilterType.AUTOCOMPLETE }> {
    return filter?.type === RegistryFilterType.AUTOCOMPLETE;
  }

  isTextFilter(
    filter: RegistryFilterModel<T> | null | undefined,
  ): filter is Extract<RegistryFilterModel<T>, { type: RegistryFilterType.TEXT }> {
    return filter?.type === RegistryFilterType.TEXT;
  }

  isMultiselectFilter(
    filter: RegistryFilterModel<T> | null | undefined,
  ): filter is Extract<RegistryFilterModel<T>, { type: RegistryFilterType.MULTISELECT }> {
    return filter?.type === RegistryFilterType.MULTISELECT;
  }
}
