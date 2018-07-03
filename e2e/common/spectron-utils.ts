import {Application} from 'spectron';

const SpectronApplication = require('spectron').Application;
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');
const appName = require('../../app.package.json').name;

chai.should();
chai.use(chaiAsPromised);

const pathToApp = {
  'win32': `build-artifacts/${appName}.exe`,
  'linux': `build-artifacts/${appName}.AppImage`,
  'darwin': `/Volumes/${appName}/${appName}.app/Contents/MacOS/${appName}`
};

const path = pathToApp[process.platform];

export class SpectronUtils {
  public static app = new SpectronApplication({
    path: path,
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
