import { StringPlugin } from '../../../string-plugin';
import { DynamicLibrary, Library, types } from 'ffi';

export class CppStringPluginProxy implements StringPlugin { 
    lib; 
	platformToOs : {[nodeName: string] : string} = {"win32" : "win", "darwin" : "mac", "linux" : "linux"}
    constructor(){
        var path = __dirname+'/'+process.arch+'/'+this.platformToOs[process.platform]+'/simplelib';
        this.lib = new Library(path, {'getString' : [types.CString, []] });
    }
    getString(): string {    
        return this. lib.getString();
    };
}
