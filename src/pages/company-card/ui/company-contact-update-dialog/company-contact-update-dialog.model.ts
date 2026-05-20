import { CompanyContactRoleCode, CompanyContactStatusCode } from '@entities/company-contact';

export type CompanyContactUpdateMode = 'role' | 'status';
export type CompanyContactUpdateValue = CompanyContactRoleCode | CompanyContactStatusCode;
