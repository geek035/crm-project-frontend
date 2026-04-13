import { Pipe, PipeTransform } from '@angular/core';

import { InfoBlockLinkType } from './info-block-link.model';

@Pipe({ name: 'infoBlockLink' })
export class InfoBlockLinkPipe implements PipeTransform {
  transform(link: string | null | undefined, type: InfoBlockLinkType = 'default'): unknown {
    return !link ? null : getLinkPrefix(type) + link;
  }
}

function getLinkPrefix(type: InfoBlockLinkType): string {
  return type === 'default' ? '' : `${type}:`;
}
