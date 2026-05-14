import { FormControl, FormGroup } from '@angular/forms';

export type FormControlsOF<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? FormGroup<FormControlsOF<T[K]>>
    : FormControl<T[K]>;
};
