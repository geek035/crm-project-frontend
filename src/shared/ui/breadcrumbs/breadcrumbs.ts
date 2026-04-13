import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { BreadcrumbsService } from './breadcrumbs.service';

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
  private readonly titleService = inject(Title);

  readonly home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  readonly breadcrumbs = this.breadcrumbsService.getBreadcrumbs();

  constructor() {
    effect(() => {
      const breadcrumbs = this.breadcrumbs();
      const title = breadcrumbs?.at(-1)?.label;

      if (title) {
        this.titleService.setTitle(title);
      }
    });
  }
}
