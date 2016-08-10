import { StringPlugin } from '../../../StringPlugin'
var CppStringPlugin = require('./StringProvider.node');

export class CppStringPluginProxy implements StringPlugin { 
    getString(): string{
        return CppStringPlugin.getString();   
    };
}