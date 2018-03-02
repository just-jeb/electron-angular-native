import {Application} from 'spectron';

const SpectronApplication = require('spectron').Application;
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');

chai.should();
chai.use(chaiAsPromised);

const platformToExtension = {
  'win32': 'exe',
  'linux': 'AppImage',
  'darwin': 'app'
};

const path = process.platform === 'darwin' ? '/usr/bin/open' :
  `build-artifacts/ElectronAngularNativeApp.${platformToExtension[process.platform]}`;
const args = process.platform === 'darwin' ? ['-a ElectronAngularNativeApp'] : undefined;

export class SpectronUtils {
  public static app = new SpectronApplication({
    path,
    args
  });

  static describe(desc: string, describeFunction: (app: Application) => void) {

    describe(desc, function () {
      this.timeout(10000);

      before(() => {
        return SpectronUtils.app.start();
      });

      describeFunction(SpectronUtils.app);

      after(() => {
        if (SpectronUtils.app && SpectronUtils.app.isRunning()) {
          return SpectronUtils.app.stop();
        }
      });
    });
  }
}

chaiAsPromised.transferPromiseness = SpectronUtils.app.transferPromiseness;
