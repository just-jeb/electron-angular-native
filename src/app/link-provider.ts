import {InjectionToken} from '@angular/core';

export const LINK_PROVIDERS = new InjectionToken<LinkProvider>('LINK_PROVIDERS');

export interface LinkProvider {
  getLink();
  getTitle();
}
