import { CompanyContactRoleCode } from '../company-contact-role-code.enum';

export interface CompanyContactCreateCommand {
  individualID: string;
  roleCode: CompanyContactRoleCode;
}
