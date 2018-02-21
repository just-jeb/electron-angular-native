import {SpectronUtils} from './common/spectron-utils';
import {Application} from 'spectron';
import * as path from 'path';
import * as fs from 'fs';

const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');

chai.should();
chai.use(chaiAsPromised);

function containsString(app: Application, str: string) {
  it(`Contains ${str}`,
    () => {
      app.webContents.savePage(path.resolve(__dirname, 'page.html'), 'HTMLComplete')
        .then(function () {
          console.log(fs.readFileSync(path.resolve(__dirname, 'page.html'), 'utf8'));
        }).catch(function (error) {
        console.error('saving page failed', error.message)
      });
    return app.client.waitUntilWindowLoaded().getText('ul li h2').then(list => {
        const index = list.indexOf(str);
        return index > -1 ? list[index] : '';
      }).should.eventually.equal(str);
    }
  );
}

SpectronUtils.describe('Native strings', app => {

  containsString(app, 'c++ .node string');
  containsString(app, 'c++ precompiled library string');
});
