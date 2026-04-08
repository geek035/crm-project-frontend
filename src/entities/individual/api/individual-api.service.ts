import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { PageModel } from '@shared/model';

import { environment } from '@environment';

import { IndividualAddDTO, IndividualsQueryDTO } from '../model/individual-request.model';
import { IndividualModel } from '../model/individual.model';

@Injectable({ providedIn: 'root' })
export class IndividualAPIService {
  private readonly httpClient = inject(HttpClient);

  addIndividual(payload: IndividualAddDTO): Observable<IndividualModel['id']> {
    return this.httpClient.post<IndividualModel['id']>(
      `${environment.API}/individuals/create`,
      payload,
    );
  }

  getIndividuals(
    payload: Partial<IndividualsQueryDTO> = {},
  ): Observable<PageModel<IndividualModel>> {
    return this.httpClient.post<PageModel<IndividualModel>>(
      `${environment.API}/individuals/query`,
      payload,
    );
  }
}
