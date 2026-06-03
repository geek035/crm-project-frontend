import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { COMPANIES_URL, COMPANY_CREATE_URL } from '@features/companies-navigation';
import { CompanyManagerService } from '@features/company-manager';
import { DealManagerService } from '@features/deal-manager';
import { DEALS_URL, DEAL_CREATE_URL, getDealCardURL } from '@features/deals-navigation';
import { IndividualManagerService } from '@features/individual-manager';
import { INDIVIDUALS_URL, INDIVIDUAL_CREATE_URL } from '@features/individuals-navigation';

import { DealDTO, mapDealPrioritySeverity } from '@entities/deal';

import { HomePageController } from './home-page.controller';
import { HomeMetricModel, HomeProcessStepModel } from './home-page.model';

@Component({
  selector: 'crm-home-page',
  providers: [
    CompanyManagerService,
    IndividualManagerService,
    DealManagerService,
    HomePageController,
  ],
  imports: [
    CommonModule,
    RouterLink,
    ButtonModule,
    CardModule,
    MessageModule,
    SkeletonModule,
    TagModule,
    TooltipModule,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private readonly controller = inject(HomePageController);
  private readonly countFormatter = new Intl.NumberFormat('ru-RU');
  private readonly moneyFormatter = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  });

  readonly state = this.controller.state;
  readonly error = this.controller.error;
  readonly dashboard = this.controller.dashboard;
  readonly attentionDeals = computed(() => this.dashboard()?.attentionDeals ?? []);

  readonly companiesLink = `/${COMPANIES_URL}`;
  readonly individualsLink = `/${INDIVIDUALS_URL}`;
  readonly dealsLink = `/${DEALS_URL}`;
  readonly companyCreateLink = `/${COMPANY_CREATE_URL}`;
  readonly individualCreateLink = `/${INDIVIDUAL_CREATE_URL}`;
  readonly dealCreateLink = `/${DEAL_CREATE_URL}`;
  readonly dateFormat = 'dd.MM.yyyy';

  readonly metrics = computed<HomeMetricModel[]>(() => {
    const dashboard = this.dashboard();

    return [
      {
        label: 'Клиентская база',
        value: dashboard?.totals.clients ?? 0,
        icon: 'pi pi-users',
      },
      {
        label: 'Компании',
        value: dashboard?.totals.companies ?? 0,
        icon: 'pi pi-building',
        routerLink: this.companiesLink,
      },
      {
        label: 'Физ. лица',
        value: dashboard?.totals.individuals ?? 0,
        icon: 'pi pi-id-card',
        routerLink: this.individualsLink,
      },
      {
        label: 'Сделки',
        value: dashboard?.totals.deals ?? 0,
        icon: 'pi pi-briefcase',
        routerLink: this.dealsLink,
      },
      {
        label: 'Открытые сделки',
        value: dashboard?.totals.openDeals ?? 0,
        icon: 'pi pi-clock',
        routerLink: this.dealsLink,
      },
      {
        label: 'На контроле',
        value: dashboard?.totals.urgentDeals ?? 0,
        icon: 'pi pi-flag',
        routerLink: this.dealsLink,
      },
    ];
  });

  readonly processSteps: HomeProcessStepModel[] = [
    {
      label: 'Клиент',
      detail: 'Карточки компаний и физ. лиц',
      icon: 'pi pi-id-card',
      routerLink: this.companiesLink,
    },
    {
      label: 'Контакт',
      detail: 'Ответственные лица компании',
      icon: 'pi pi-address-book',
      routerLink: this.companiesLink,
    },
    {
      label: 'Банковский продукт',
      detail: 'Заявка по продукту и условиям',
      icon: 'pi pi-wallet',
      routerLink: this.dealCreateLink,
    },
    {
      label: 'Контроль',
      detail: 'Этапы, статусы и сроки сделок',
      icon: 'pi pi-sitemap',
      routerLink: this.dealsLink,
    },
  ];

  formatCount(value: number): string {
    return this.countFormatter.format(value);
  }

  formatAmount(deal: DealDTO): string {
    return `${this.moneyFormatter.format(deal.amount)} ${deal.currency.description}`;
  }

  getDealRouterLink(deal: DealDTO): string {
    return `/${getDealCardURL(deal.id)}`;
  }

  getPrioritySeverity(deal: DealDTO): ReturnType<typeof mapDealPrioritySeverity> {
    return mapDealPrioritySeverity(deal);
  }
}
