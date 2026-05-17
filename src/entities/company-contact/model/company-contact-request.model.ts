import { CompanyContactRoleCode } from './company-contact-role-code.enum';

export interface CompanyContactCreateDTO {
  individualID: string;
  roleCode: CompanyContactRoleCode;
}

export interface CompanyContactUpdateRoleDTO {
  roleCode: string;
}

export interface CompanyContactUpdateStatusDTO {
  statusCode: string;
}
