import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReplaySubject, catchError, defer, of, switchMap, tap } from 'rxjs';

import { RegistryConfigService } from '../../config/registry-config.service';
import { RegistryConfigModel, RegistryContentModel } from '../../model/registry-config.model';
import { RegistryLoadParamsModel, RegistryUIStateModel } from '../../model/registry-state.model';

@Injectable()
export class RegistryController<T> {
  private readonly configService = inject(RegistryConfigService<T>);

  private readonly _state = signal<RegistryUIStateModel>({ status: 'initial' });
  get state(): Signal<RegistryUIStateModel> {
    return this._state;
  }

  private readonly _columns = computed(() => this.configService.registrySettings()['columns']);
  get columns(): Signal<RegistryConfigModel<T>['columns']> {
    return this._columns;
  }

  private readonly params$ = new ReplaySubject<RegistryLoadParamsModel>(1);
  private readonly data$ = defer(() => {
    if (this._state().status !== 'initial') {
      this._state.set({ status: 'loading' });
    }

    return this.params$.pipe(
      switchMap((params) => this.configService.requestData(params)),
      tap(() => this._state.set({ status: 'success' })),
      catchError((error) => {
        console.error(error);
        this._state.set({ status: 'error', error });

        return of<RegistryContentModel<T>>({ total: 0, content: [] });
      }),
    );
  });

  private readonly _data = toSignal(this.data$, {
    initialValue: { total: 5, content: new Array(5).fill(0) },
  });
  get data(): Signal<RegistryContentModel<T>> {
    return this._data;
  }

  load(params: RegistryLoadParamsModel): void {
    this.params$.next(params);
  }
}
