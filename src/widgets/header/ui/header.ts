import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { distinctUntilChanged, filter, map } from 'rxjs';

import { HEADER_INTERNAL_ITEMS } from './header.const';

@Component({
  selector: 'app-header',
  imports: [CommonModule, ButtonModule, MenubarModule, RouterLink],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly homePageLink = '/';
  private readonly router = inject(Router);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
      distinctUntilChanged(),
    ),
  );

  readonly items = computed<MenuItem[]>(() => {
    return HEADER_INTERNAL_ITEMS.map<MenuItem>((item) =>
      item.routerLink !== this.currentUrl()
        ? item
        : { ...item, linkClass: 'bg-primary-900 rounded-2xl text-primary-50' },
    );
  });
}
