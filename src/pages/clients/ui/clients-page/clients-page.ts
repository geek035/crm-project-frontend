import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';

import { ClientsPageController } from './clients-page.controller';

@Component({
  selector: 'app-clients-page',
  imports: [CardModule],
  templateUrl: './clients-page.html',
  providers: [ClientsPageController],
  host: { class: 'crm-page' },
})
export class ClientsPage {
  private readonly controller = inject(ClientsPageController);
}
