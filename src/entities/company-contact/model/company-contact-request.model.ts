import { CompanyContactRoleCode } from './company-contact-role-code.enum';
import { CompanyContactStatusCode } from './company-contact-status-code';

export interface CompanyContactCreateDTO {
  individualID: string;
  roleCode: CompanyContactRoleCode;
}

export interface CompanyContactUpdateRoleDTO {
  roleCode: CompanyContactRoleCode;
}

export interface CompanyContactUpdateStatusDTO {
  statusCode: CompanyContactStatusCode;
}
