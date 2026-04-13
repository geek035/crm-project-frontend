import { FactoryProvider, InjectionToken, Injector } from '@angular/core';

const DEFAULT_VALUE: InfoBlockGridAvailableColumnsCount = 1;

export type InfoBlockGridAvailableColumnsCount = 1 | 2 | 3 | 4;

export const INFO_BLOCK_GRID_DEFAULT_COLS_COUNT_TOKEN =
  new InjectionToken<InfoBlockGridAvailableColumnsCount>(
    'Token to provider default info-block-grid cols number',
  );

export const INFO_BLOCK_GRID_DEFAULT_COLS_COUNT_PROVIDER: FactoryProvider = {
  provide: INFO_BLOCK_GRID_DEFAULT_COLS_COUNT_TOKEN,
  useFactory: (injector: Injector) =>
    injector.get(INFO_BLOCK_GRID_DEFAULT_COLS_COUNT_TOKEN, DEFAULT_VALUE, { skipSelf: true }),
  deps: [Injector],
};
