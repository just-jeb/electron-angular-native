import {LinkProvider} from '../../app/link-provider';
import {Injectable} from '@angular/core';

//TODO: use webpack node loader to load this
const CppStringPlugin = require('./string-provider.node');

@Injectable()
export class NodeAddonLinkService implements LinkProvider{
    getLink(): string{
        return CppStringPlugin.getString();
    };
}
