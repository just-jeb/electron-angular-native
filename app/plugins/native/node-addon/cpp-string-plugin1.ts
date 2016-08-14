import { StringPlugin } from '../../../string-plugin'
var CppStringPlugin = require('./string-provider.node');

export class CppStringPluginProxy implements StringPlugin { 
    getString(): string{
        return CppStringPlugin.getString();   
    };
}