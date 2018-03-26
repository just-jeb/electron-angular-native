import {LinkProvider} from './link-provider';
import {Injectable} from '@angular/core';

const nativeAddon = require('../../native-artifacts/native-addons/link-provider.node');

@Injectable()
export class NodeAddonLinkService implements LinkProvider {
  getTitle() {
    return 'The link is provided by Node addon (using nan)';
  }
  getLink(): string {
    return nativeAddon.getLink();
  }
}
