import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-clients-page',
  imports: [CardModule],
  templateUrl: './clients-page.html',
  host: { class: 'crm-page' },
})
export class ClientsPage {}
