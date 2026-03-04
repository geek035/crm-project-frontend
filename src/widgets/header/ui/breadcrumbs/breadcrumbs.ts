import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { BreadcrumbsService } from '../../model/breadcrumbs.service';

@Component({
  selector: 'crm-breadcrumbs',
  imports: [BreadcrumbModule],
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex' },
})
export class Breadcrumbs {
  private readonly breadcrumbsService = inject(BreadcrumbsService);

  readonly home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  readonly breadcrumbs = this.breadcrumbsService.getBredcrumbs();
}
