import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import { GetClientsParamsDTO } from '../model/client-request.model';
import { ClientModel } from '../model/client.model';
import { MOCK_CLIENT } from './__mock__';

@Injectable({ providedIn: 'root' })
export class ClientAPIService {
  private readonly httpClient = inject(HttpClient);

  getClients({ textSearch }: Partial<GetClientsParamsDTO> = {}): Observable<ClientModel[]> {
    return of(
      new Array(10).fill(MOCK_CLIENT).map<ClientModel>((value, index) => ({ ...value, id: index })),
    ).pipe(
      map((clients) => clients.filter((client) => client.firstName.includes(textSearch ?? ''))),
    );
  }
}
