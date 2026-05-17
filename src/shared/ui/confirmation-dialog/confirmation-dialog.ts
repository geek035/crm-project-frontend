import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'crm-confirmation-dialog',
  imports: [DialogModule, ButtonModule],
  templateUrl: './confirmation-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialog {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  readonly dialogHeader = input.required<string>({ alias: 'header' });
  readonly label = input.required<string>();
  readonly visible = model(false);
  readonly confirmed = output<boolean>();

  private resolved = false;

  handleConfirm(): void {
    this.resolved = true;
    this.confirmed.emit(true);
    this.visible.set(false);
  }

  handleCancel(): void {
    if (this.resolved) {
      this.resolved = false;
      return;
    }

    this.confirmed.emit(false);
    this.visible.set(false);
  }
}
