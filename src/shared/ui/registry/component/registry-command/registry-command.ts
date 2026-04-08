import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import {
  RegistryCommandModel,
  RegistryCommandType,
} from '../../registry-model/registry-command.model';

@Component({
  selector: 'crm-registry-command',
  imports: [ButtonModule, RouterModule],
  templateUrl: './registry-command.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistryCommand<T> {
  readonly command = input.required<RegistryCommandModel<T>>();
  readonly selectedValue = input.required<T | null>();

  readonly routerLink = computed(() => {
    const command = this.command();

    if (this.isLinkCommand(command)) {
      return typeof command.routerLink === 'string'
        ? command.routerLink
        : command.routerLink(this.selectedValue());
    }

    return null;
  });

  public isLinkCommand(
    command: RegistryCommandModel<T> | null | undefined,
  ): command is Extract<RegistryCommandModel<T>, { type: RegistryCommandType.LINK }> {
    return command?.type === RegistryCommandType.LINK;
  }

  public isButtonCommand(
    command: RegistryCommandModel<T> | null | undefined,
  ): command is Extract<RegistryCommandModel<T>, { type: RegistryCommandType.BUTTON }> {
    return command?.type === RegistryCommandType.BUTTON;
  }
}
