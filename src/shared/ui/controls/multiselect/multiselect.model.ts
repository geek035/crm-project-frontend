import { Observable } from 'rxjs';

import { DirectoryEntryDTO } from '@shared/model';

export interface MultiselectInput<T = DirectoryEntryDTO> {
  placeholder?: string;
  optionLabel?: string;
  optionValue?: string;
  query: () => Observable<T[]>;
}
