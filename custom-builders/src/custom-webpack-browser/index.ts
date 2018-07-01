/**
 * Created by Evgeny Barabanov on 28/06/2018.
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {Builder, BuilderContext} from '@angular-devkit/architect';
import {CustomWebpackBrowserBuildSchema} from './schema';
import {BrowserBuilder} from '@angular-devkit/build-angular';
import {getSystemPath, Path, virtualFs} from '@angular-devkit/core';
import * as fs from 'fs';
import {NormalizedBrowserBuilderSchema} from '@angular-devkit/build-angular/src/browser';

const webpackMerge = require('webpack-merge');

export interface NormalizedCustomWebpackBrowserBuildSchema extends NormalizedBrowserBuilderSchema {
  webpackConfigPath: string;
}

export class CustomWebpackBrowserBuilder extends BrowserBuilder implements Builder<CustomWebpackBrowserBuildSchema> {

  constructor(context: BuilderContext) {
    super(context);
  }


  buildWebpackConfig(root: Path,
                     projectRoot: Path,
                     host: virtualFs.Host<fs.Stats>,
                     options: NormalizedCustomWebpackBrowserBuildSchema) {
    const webpackConfigPath = options.webpackConfigPath || 'webpack.config.js';
    const customWebpackConfig = require(`${getSystemPath(root)}/${webpackConfigPath}`);
    if (!customWebpackConfig) {
      throw Error('No custom webpack config path specified. The default path is ./webpack.config.js');
    }
    const browserWebpackCOnfig = super.buildWebpackConfig(root, projectRoot, host, options);
    return webpackMerge([browserWebpackCOnfig, customWebpackConfig]);
  }
}

export default CustomWebpackBrowserBuilder;
