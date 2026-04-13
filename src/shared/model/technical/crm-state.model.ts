import { CRMErrorModel } from './crm-error.model';

export type CRMStateModel =
  | { state: 'initial' }
  | { state: 'loading' }
  | { state: 'success' }
  | { state: 'error'; error?: CRMErrorModel };
