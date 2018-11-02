import {Library, types} from 'ffi-napi';
import {LinkProvider} from './link-provider';
import {Injectable} from '@angular/core';
import * as path from 'path';

@Injectable()
export class PrecompiledLibraryLinkService implements LinkProvider {

  lib;

  constructor() {
    this.lib = new Library(path.resolve(__dirname, 'native-artifacts/precompiled-libraries/simplelib'), {'getLink': [types.CString, []]});
  }

  getTitle() {
    return 'The link is provided by precompiled native library (using ffi)';
  }

  getLink(): string {
    return this.lib.getLink();
  }
}
