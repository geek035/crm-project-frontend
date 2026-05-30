import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseQueryDTO, DirectoryEntryDTO, PageModel } from '@shared/model';

import { environment } from '@environment';

import { CompanyContactDTO } from '../model/company-contact-dto.model';
import {
  CompanyContactCreateDTO,
  CompanyContactUpdateRoleDTO,
  CompanyContactUpdateStatusDTO,
} from '../model/company-contact-request.model';
import { CompanyContactRoleCode } from '../model/company-contact-role-code.enum';
import { CompanyContactStatusCode } from '../model/company-contact-status-code';

@Injectable({ providedIn: 'root' })
export class CompanyContactAPIService {
  private readonly httpClient = inject(HttpClient);

  queryContacts(
    companyID: string,
    payload: BaseQueryDTO,
  ): Observable<PageModel<CompanyContactDTO>> {
    return this.httpClient.post<PageModel<CompanyContactDTO>>(
      `${environment.API}/companies/${companyID}/contacts/query`,
      payload,
    );
  }

  getRoles(companyID: string): Observable<DirectoryEntryDTO<CompanyContactRoleCode>[]> {
    return this.httpClient.get<DirectoryEntryDTO<CompanyContactRoleCode>[]>(
      `${environment.API}/companies/${companyID}/contacts/directories/roles`,
    );
  }

  getStatuses(companyID: string): Observable<DirectoryEntryDTO<CompanyContactStatusCode>[]> {
    return this.httpClient.get<DirectoryEntryDTO<CompanyContactStatusCode>[]>(
      `${environment.API}/companies/${companyID}/contacts/directories/statuses`,
    );
  }

  addContact(companyID: string, payload: CompanyContactCreateDTO): Observable<string> {
    return this.httpClient.post<string>(
      `${environment.API}/companies/${companyID}/contacts`,
      payload,
    );
  }

  deleteContact(companyID: string, contactId: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.API}/companies/${companyID}/contacts/${contactId}`,
    );
  }

  updateRole(
    companyID: string,
    contactId: string,
    payload: CompanyContactUpdateRoleDTO,
  ): Observable<CompanyContactDTO> {
    return this.httpClient.post<CompanyContactDTO>(
      `${environment.API}/companies/${companyID}/contacts/${contactId}/role`,
      payload,
    );
  }

  updateStatus(
    companyID: string,
    contactId: string,
    payload: CompanyContactUpdateStatusDTO,
  ): Observable<CompanyContactDTO> {
    return this.httpClient.post<CompanyContactDTO>(
      `${environment.API}/companies/${companyID}/contacts/${contactId}/status`,
      payload,
    );
  }
}
