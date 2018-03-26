import {SpectronUtils} from './common/spectron-utils';
import {Application} from 'spectron';

const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');

chai.should();
chai.use(chaiAsPromised);

function containsString(app: Application, text: string, url: string) {
  it(`Contains ${text}`,
    () => {
    return app.client.waitForExist('ul li h2 a').then(() => Promise.all([
      app.client.getText('ul li h2 a').should.eventually.include(text),
      app.client.getAttribute('ul li h2 a', 'href').should.eventually.include(url)
    ]));
  });
}

SpectronUtils.describe('Native strings', app => {
  containsString(app, 'The link is provided by Node addon (using nan)', 'https://github.com/nodejs/nan');
  containsString(app, 'The link is provided by precompiled native library (using ffi)', 'https://github.com/node-ffi/node-ffi');
});
