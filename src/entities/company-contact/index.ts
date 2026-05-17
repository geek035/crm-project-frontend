export type { CompanyContactDTO } from './model/company-contact-dto.model';
export type { CompanyContactCreateDTO } from './model/company-contact-request.model';
export { CompanyContactRoleCode } from './model/company-contact-role-code.enum';
export { CompanyContactStatusCode } from './model/company-contact-status-code';

export { CompanyContactAPIService } from './api/company-contact-api.service';

export { mapCompanyContactRoleSeverity } from './lib/company-contact-role-severity.mapper';
export { mapCompanyContactStatusSeverity } from './lib/company-contact-status-severity.mapper';
