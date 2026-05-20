import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { FormStateSaverService } from '../form-state-saver/form-state-saver.service';

@Component({
  selector: 'crm-form-restore-suggestion',
  imports: [ToastModule, ButtonModule],
  templateUrl: './form-restore-suggestion.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRestoreSuggestion implements AfterViewInit {
  private readonly messageService = inject(MessageService);
  private readonly formStateSaver = inject(FormStateSaverService);

  readonly formKey = input.required<string>();
  readonly restore = output<void>();

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      if (this.formStateSaver.isFormStateSaved(this.formKey())) {
        this.messageService.add({
          key: this.formKey(),
          sticky: true,
          severity: 'contrast',
          summary: 'Нашли данные',
          detail: 'Нашли сохраненную форму. Восстановить данные?',
        });
      }
    });
  }

  handleRestoreClick(): void {
    this.restore.emit();
  }
}
