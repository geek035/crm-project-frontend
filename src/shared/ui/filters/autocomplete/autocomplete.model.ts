import { Observable } from 'rxjs';

export interface AutocompleteInput<T> {
  query: (q: string) => Observable<T[]>;
  optionLabel: string;
  optionValue: string;
}
