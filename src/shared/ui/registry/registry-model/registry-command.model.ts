import { ButtonProps } from 'primeng/button';

export enum RegistryCommandType {
  LINK = 'link',
  BUTTON = 'button',
}

export type RegistryCommandModel<T> =
  | {
      type: RegistryCommandType.LINK;
      label: string;
      routerLink: string | ((item: T | null) => string | null);
    }
  | ({ type: RegistryCommandType.BUTTON; command: (item: T | null) => void } & ButtonProps);
