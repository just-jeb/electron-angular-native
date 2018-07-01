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
import {CustomWebpackServerBuildSchema} from './schema';
import {ServerBuilder} from '@angular-devkit/build-angular';
import {getSystemPath, Path, virtualFs} from '@angular-devkit/core';
import * as fs from 'fs';


const webpackMerge = require('webpack-merge');

export class CustomWebpackServerBuilder extends ServerBuilder implements Builder<CustomWebpackServerBuildSchema> {

  constructor(public context: BuilderContext) {
    super(context);
  }
  buildWebpackConfig(root: Path,
                     projectRoot: Path,
                     host: virtualFs.Host<fs.Stats>,
                     options: CustomWebpackServerBuildSchema) {
    const webpackConfigPath = options.webpackConfigPath || 'webpack.config.js';
    const customWebpackConfig = require(`${getSystemPath(root)}/${webpackConfigPath}`);
    const browserWebpackCOnfig = super.buildWebpackConfig(root, projectRoot, host, options);
    return webpackMerge([browserWebpackCOnfig, customWebpackConfig]);
  }
}

export default CustomWebpackServerBuilder;
