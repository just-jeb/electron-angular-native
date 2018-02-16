import {SpectronUtils} from './common/spectron-utils';

const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');

chai.should();
chai.use(chaiAsPromised);

SpectronUtils.describe('Application launch', app =>
  it('shows an initial window', () => app.client.getWindowCount().should.eventually.have.at.least(1))
);
