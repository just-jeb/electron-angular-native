import {SpectronUtils} from './common/spectron-utils';

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.should();
chai.use(chaiAsPromised);

SpectronUtils.describe('Application launch', app =>
  it('shows an initial window', () => app.client.getWindowCount().should.eventually.have.at.least(1))
);
