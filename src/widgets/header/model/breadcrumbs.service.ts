import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { BreadcrumbModel } from './breacrumbs.model';

interface CalculateBreadcrumbsParams {
  breadcrumbByToken: BreadcrumbModel | null;
  parentUrl: string[];
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbsService {
  private readonly router = inject(Router);

  private readonly breadcrumbByToken = signal<BreadcrumbModel | null>(null);
  private readonly navigationEnd = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.routerState.snapshot.root),
    ),
  );

  private readonly breadcrumbs = computed(() => {
    const rootRouter = this.navigationEnd();
    const breadcrumbByToken = this.breadcrumbByToken();

    return rootRouter
      ? this.calculateBreadcrumbs(rootRouter, { breadcrumbByToken, parentUrl: [] })
      : undefined;
  });

  getBredcrumbs(): Signal<BreadcrumbModel[] | undefined> {
    return this.breadcrumbs;
  }

  setBreadcrumbByToken(breadcrumb: BreadcrumbModel): void {
    this.breadcrumbByToken.set(breadcrumb);
  }

  private calculateBreadcrumbs(
    route: ActivatedRouteSnapshot,
    { breadcrumbByToken, parentUrl }: CalculateBreadcrumbsParams,
  ): BreadcrumbModel[] {
    if (!route.url.length && route.children.length) {
      return this.calculateBreadcrumbs(route.children[0], { breadcrumbByToken, parentUrl });
    }

    const urlSegment = route.url.map((url) => url.path);
    const currentUrl = [...parentUrl, ...urlSegment];
    const url = currentUrl.join('/');

    const routeBreadcrumbs = route.data['breadcrumbs'] as BreadcrumbModel[];
    let breadcrumbs: BreadcrumbModel[] = [];

    if (routeBreadcrumbs && Array.isArray(routeBreadcrumbs)) {
      const tokenized = routeBreadcrumbs.findIndex((breadcrumb) => !!breadcrumb.mapToken);

      breadcrumbs = breadcrumbs.concat(routeBreadcrumbs);
      breadcrumbs.splice(-1, 1, {
        ...breadcrumbs.at(-1),
        url: breadcrumbs.at(-1)?.url || url,
      });

      if (tokenized >= 0 && breadcrumbByToken) {
        breadcrumbs.splice(tokenized, 1, breadcrumbByToken);
      }
    }

    if (!route.children.length) {
      return breadcrumbs;
    }

    return [
      ...breadcrumbs,
      ...this.calculateBreadcrumbs(route.children[0], { breadcrumbByToken, parentUrl: currentUrl }),
    ];
  }
}
