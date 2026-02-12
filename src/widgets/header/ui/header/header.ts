import { FocusMonitor } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { FocusTrapModule } from 'primeng/focustrap';

import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';
import { HEADER_INTERNAL_ITEMS } from './header.const';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    ButtonModule,
    RouterLink,
    RouterLinkActive,
    Breadcrumbs,
    FocusTrapModule,
    AutoFocusModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly focusMonitor = inject(FocusMonitor);

  readonly homePageLink = '/';

  readonly items = signal(HEADER_INTERNAL_ITEMS);
  readonly panelOpened = signal<'opened' | 'closed' | 'pending'>('pending');
  private readonly navPanel = viewChild<ElementRef<HTMLElement>>('navPanel');

  toggleMenu(): void {
    const opened = this.panelOpened() === 'opened' ? 'closed' : 'opened';
    this.panelOpened.set(opened);

    if (opened === 'opened') {
      queueMicrotask(() => {
        const menuItem = this.navPanel()?.nativeElement.querySelector('a');

        if (menuItem) {
          this.focusMonitor.focusVia(menuItem, 'keyboard');
        }
      });
    }
  }

  closeMenu(): void {
    if (this.panelOpened() === 'opened') {
      this.panelOpened.set('closed');
    }
  }
}
