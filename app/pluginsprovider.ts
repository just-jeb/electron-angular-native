import { StringPlugin } from './StringPlugin'
import { Injectable } from '@angular/core'
declare var System: any;
@Injectable()
export class PluginsProvider {
    plugins: StringPlugin[] = [];
    constructor() {
        var plugin = null;
        //Non-native implementation of StringPlugin interface
        plugin = require('plugins/js-string-plugin.js');
        this.plugins.push(new plugin[Object.keys(plugin)[0]]())
        //Native implementation of StringPlugin interface with proxy class
        plugin = require('plugins/native/node-addon/cpp-string-plugin1.js');
        this.plugins.push(new plugin[Object.keys(plugin)[0]]())
        //Native implementation of StringPlugin interface without proxy class
        plugin = require('plugins/native/node-addon/StringProvider.node');
        this.plugins.push(plugin)
        //Native implementation of StringPlugin interface with proxy class. 
        //Loaded using node.js module resolution mechanism to avoid mapping all the transitive dependencies in systemjs.config.js
        plugin = System._nodeRequire('./plugins/native/simple-dll/cpp-string-plugin2.js');
        this.plugins.push(new plugin[Object.keys(plugin)[0]]);
    }

    getPlugins(): StringPlugin[] {
        return this.plugins;
    }
}