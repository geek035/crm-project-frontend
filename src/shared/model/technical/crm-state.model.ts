import { CRMErrorModel } from './crm-error.model';

export type CRMStateModel =
  | { state: 'initial' }
  | { state: 'loading' }
  | { state: 'success' }
  | { state: 'pending' }
  | { state: 'error'; error?: CRMErrorModel };
