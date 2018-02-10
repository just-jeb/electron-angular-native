import {Library, types} from 'ffi';
import {LinkProvider} from '../../app/link-provider';
import {Injectable} from '@angular/core';

//TODO: eject ng cli and use externals to get all the node modules available at angular
@Injectable()
export class PrecompiledLibraryLinkService implements LinkProvider {
  lib;
  platformToOs: { [nodeName: string]: string } = {'win32': 'win', 'darwin': 'mac', 'linux': 'linux'};

  constructor() {
    const path = __dirname + '/' + process.arch + '/' + this.platformToOs[process.platform] + '/simplelib';
    this.lib = new Library(path, {'getString': [types.CString, []]});
  }

  getLink(): string {
    return this.lib.getString();
  };
}
