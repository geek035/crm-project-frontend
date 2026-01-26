import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  imports: [CommonModule, ButtonModule, MenubarModule, RouterLink],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly homePageLink = '/';
  readonly items = input<MenuItem[]>([]);

  isScrolled = false;

  private readonly document = inject(DOCUMENT);

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = !!this.document.defaultView?.scrollY;
  }
}
