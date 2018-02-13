import {LinkProvider} from './link-provider';
import {Injectable} from '@angular/core';

const nativeAddon = require('../../native-artifacts/native-addons/string-provider.node');

@Injectable()
export class NodeAddonLinkService implements LinkProvider {
  getLink(): string {
    return nativeAddon.getString();
  }
}
