import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ClientModel } from '@entities/client';

@Component({
  selector: 'crm-client-card',
  imports: [],
  templateUrl: './client-card.html',
  styleUrl: './client-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientCard {
  private readonly client: ClientModel | null = null;
}
