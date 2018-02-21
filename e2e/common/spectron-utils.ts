import {Application} from 'spectron';
import * as path from 'path';

const SpectronApplication = require('spectron').Application;
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');

chai.should();
chai.use(chaiAsPromised);

const platformToExtension = {
  'win32': 'exe',
  'linux': 'AppImage',
  'darwin': 'dmg'
};

export class SpectronUtils {
  public static app = new SpectronApplication({
    path: `build-artifacts/ElectronAngularNativeApp.${platformToExtension[process.platform]}`,
    waitTimeout: 10000
  });

  static describe(desc: string, describeFunction: (app: Application) => void) {

    describe(desc, function () {
      this.timeout(20000);

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
