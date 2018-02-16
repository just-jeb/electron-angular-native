import {SpectronUtils} from './common/spectron-utils';
import {Application} from 'spectron';

const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');

chai.should();
chai.use(chaiAsPromised);

function containsString(app: Application, str: string) {
  it(`Contains ${str}`,
    () => app.client.getText('ul li h2').then(list => {
      const index = list.indexOf(str);
      return index > -1 ? list[index] : '';
    }).should.eventually.equal(str)
  );
}

SpectronUtils.describe('Native strings', app => {
  containsString(app, 'c++ .node string');
  containsString(app, 'c++ precompiled library string');
});
