import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home-page';
import { HomePageController } from './home-page.controller';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  const controller = {
    state: signal({ state: 'success' }),
    error: signal(null),
    dashboard: signal(null),
    attentionDeals: signal([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [{ provide: HomePageController, useValue: controller }],
    })
      .overrideComponent(HomePage, {
        set: {
          imports: [CommonModule],
          providers: [],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
