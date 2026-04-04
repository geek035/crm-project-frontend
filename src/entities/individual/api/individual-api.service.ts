import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import { GetIndidvidualsParamsDTO } from '../model/individual-request.model';
import { IndividualModel } from '../model/individual.model';
import { MOCK_INDIVIDUAL } from './__mock__';

@Injectable({ providedIn: 'root' })
export class IndividualAPIService {
  private readonly httpClient = inject(HttpClient);

  getIndividuals({ textSearch }: Partial<GetIndidvidualsParamsDTO> = {}): Observable<
    IndividualModel[]
  > {
    return of(
      new Array(10)
        .fill(MOCK_INDIVIDUAL)
        .map<IndividualModel>((value, index) => ({ ...value, id: index })),
    ).pipe(
      map((individuals) =>
        individuals.filter((individual) => individual.firstName.includes(textSearch ?? '')),
      ),
    );
  }
}
