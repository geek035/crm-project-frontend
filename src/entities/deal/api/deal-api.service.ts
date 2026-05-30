import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseQueryDTO, DirectoryEntryDTO, PageModel } from '@shared/model';

import { environment } from '@environment';

import { DealClientTypeCode } from '../model/deal-client-type-code.enum';
import { DealCurrencyCode } from '../model/deal-currency-code.enum';
import { DealLossReasonCode } from '../model/deal-loss-reason-code.enum';
import { DealPriorityCode } from '../model/deal-priority-code.enum';
import { DealProductCode } from '../model/deal-product-code.enum';
import {
  DealChangeStageDTO,
  DealChangeStatusDTO,
  DealCreateDTO,
  DealUpdateDTO,
} from '../model/deal-request.model';
import { DealSourceCode } from '../model/deal-source-code.enum';
import { DealStageCode } from '../model/deal-stage-code.enum';
import { DealStatusCode } from '../model/deal-status-code.enum';
import { DealDTO } from '../model/deal.model';

@Injectable({ providedIn: 'root' })
export class DealAPIService {
  private readonly httpClient = inject(HttpClient);

  createDeal(payload: DealCreateDTO): Observable<string> {
    return this.httpClient.post<string>(`${environment.API}/deals/create`, payload);
  }

  findByID(id: string): Observable<DealDTO> {
    return this.httpClient.get<DealDTO>(`${environment.API}/deals/${id}`);
  }

  update(id: string, payload: DealUpdateDTO): Observable<DealDTO> {
    return this.httpClient.put<DealDTO>(`${environment.API}/deals/${id}`, payload);
  }

  changeStage(id: string, payload: DealChangeStageDTO): Observable<DealDTO> {
    return this.httpClient.post<DealDTO>(`${environment.API}/deals/${id}/stage`, payload);
  }

  changeStatus(id: string, payload: DealChangeStatusDTO): Observable<DealDTO> {
    return this.httpClient.post<DealDTO>(`${environment.API}/deals/${id}/status`, payload);
  }

  findByParams(payload: BaseQueryDTO): Observable<PageModel<DealDTO>> {
    return this.httpClient.post<PageModel<DealDTO>>(`${environment.API}/deals/query`, payload);
  }

  findByIndividualID(id: string, payload: BaseQueryDTO): Observable<PageModel<DealDTO>> {
    return this.httpClient.post<PageModel<DealDTO>>(
      `${environment.API}/deals/individual/${id}/query`,
      payload,
    );
  }

  findByCompanyID(id: string, payload: BaseQueryDTO): Observable<PageModel<DealDTO>> {
    return this.httpClient.post<PageModel<DealDTO>>(
      `${environment.API}/deals/company/${id}/query`,
      payload,
    );
  }

  getClientTypes(): Observable<DirectoryEntryDTO<DealClientTypeCode>[]> {
    return this.httpClient.get<DirectoryEntryDTO<DealClientTypeCode>[]>(
      `${environment.API}/deals/directories/client-types`,
    );
  }

  getProducts(): Observable<DirectoryEntryDTO<DealProductCode>[]> {
    return this.httpClient.get<DirectoryEntryDTO<DealProductCode>[]>(
      `${environment.API}/deals/directories/products`,
    );
  }

  getCurrencies(): Observable<DirectoryEntryDTO<DealCurrencyCode>[]> {
    return this.httpClient.get<DirectoryEntryDTO<DealCurrencyCode>[]>(
      `${environment.API}/deals/directories/currencies`,
    );
  }

  getStages(): Observable<DirectoryEntryDTO<DealStageCode>[]> {
    return this.httpClient.get<DirectoryEntryDTO<DealStageCode>[]>(
      `${environment.API}/deals/directories/stages`,
    );
  }

  getStatuses(): Observable<DirectoryEntryDTO<DealStatusCode>[]> {
    return this.httpClient.get<DirectoryEntryDTO<DealStatusCode>[]>(
      `${environment.API}/deals/directories/statuses`,
    );
  }

  getPriorities(): Observable<DirectoryEntryDTO<DealPriorityCode>[]> {
    return this.httpClient.get<DirectoryEntryDTO<DealPriorityCode>[]>(
      `${environment.API}/deals/directories/priorities`,
    );
  }

  getSources(): Observable<DirectoryEntryDTO<DealSourceCode>[]> {
    return this.httpClient.get<DirectoryEntryDTO<DealSourceCode>[]>(
      `${environment.API}/deals/directories/sources`,
    );
  }

  getLossReasons(): Observable<DirectoryEntryDTO<DealLossReasonCode>[]> {
    return this.httpClient.get<DirectoryEntryDTO<DealLossReasonCode>[]>(
      `${environment.API}/deals/directories/loss-reasons`,
    );
  }
}
