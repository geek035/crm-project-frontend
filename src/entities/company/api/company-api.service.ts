import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseQueryDTO, DirectoryEntryDTO, PageModel } from '@shared/model';

import { environment } from '@environment';

import { CompanyClientSegmentCode } from '../model/company-client-segment-code.model';
import { CompanyDTO } from '../model/company-dto.model';
import { CompanyLifecycleStatusCode } from '../model/company-lifecycle-status-code.model';
import { CompanyCreateDTO } from '../model/company-request.model';

@Injectable({ providedIn: 'root' })
export class CompanyAPIService {
  private readonly httpClient = inject(HttpClient);

  getCompanies(payload: BaseQueryDTO) {
    return this.httpClient.post<PageModel<CompanyDTO>>(
      `${environment.API}/companies/query`,
      payload,
    );
  }

  getClientSegments(): Observable<DirectoryEntryDTO<CompanyClientSegmentCode>[]> {
    return this.httpClient.get<DirectoryEntryDTO<CompanyClientSegmentCode>[]>(
      `${environment.API}/companies/directories/client-segments`,
    );
  }

  getLifecycleStatuses(): Observable<DirectoryEntryDTO<CompanyLifecycleStatusCode>[]> {
    return this.httpClient.get<DirectoryEntryDTO<CompanyLifecycleStatusCode>[]>(
      `${environment.API}/companies/directories/lifecycle-statuses`,
    );
  }

  createCompany(payload: CompanyCreateDTO): Observable<string> {
    return this.httpClient.post<string>(`${environment.API}/companies/create`, payload);
  }

  getCompanyByID(id: CompanyDTO['id']): Observable<CompanyDTO> {
    return this.httpClient.get<CompanyDTO>(`${environment.API}/companies/${id}`);
  }
}
