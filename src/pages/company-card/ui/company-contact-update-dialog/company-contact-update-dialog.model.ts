import { CompanyContactRoleCode } from '../../model/company-contact-role-code.enum';
import { CompanyContactStatusCode } from '../../model/company-contact-status-code';

export type CompanyContactUpdateMode = 'role' | 'status';
export type CompanyContactUpdateValue = CompanyContactRoleCode | CompanyContactStatusCode;
