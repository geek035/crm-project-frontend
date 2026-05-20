import { CompanyContactRoleCode } from '@entities/company-contact';

export interface CompanyContactCreateCommand {
  individualID: string;
  roleCode: CompanyContactRoleCode;
}
