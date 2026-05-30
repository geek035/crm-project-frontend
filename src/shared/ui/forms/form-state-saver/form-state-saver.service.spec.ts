import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

import { FormStateSaverService } from './form-state-saver.service';

describe(FormStateSaverService.name, () => {
  let service: FormStateSaverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormStateSaverService);
    sessionStorage.clear();
  });

  it('should not overwrite saved state from pristine form changes', () => {
    const key = 'test-form';
    const savedValue = { title: 'Сохраненная сделка' };
    const form = new FormGroup({
      title: new FormControl(''),
    });

    sessionStorage.setItem(key, JSON.stringify(savedValue));
    const subscription = service.saveFormState(key, form).subscribe();
    form.patchValue({ title: '' });

    expect(service.getFormState(key)).toEqual(savedValue);

    subscription.unsubscribe();
  });

  it('should save dirty form changes', () => {
    const key = 'test-form';
    const form = new FormGroup({
      title: new FormControl(''),
    });

    const subscription = service.saveFormState(key, form).subscribe();
    form.markAsDirty();
    form.patchValue({ title: 'Новая сделка' });

    expect(service.getFormState(key)).toEqual({ title: 'Новая сделка' });

    subscription.unsubscribe();
  });
});
