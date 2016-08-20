import { StringPlugin } from '../../../string-plugin';
import { DynamicLibrary, Library, types } from 'ffi';

export class CppStringPluginProxy implements StringPlugin { 
    lib; 
    constructor(){
        var prefix: String = process.arch == 'x64' ? 'x64/' : "";
	var postfix: String = process.platform;
        var path = __dirname+'/'+prefix+'Release/'+postfix+'/simplelib';
        this.lib = new Library(path, {'getString' : [types.CString, []] });
    }
    getString(): string {    
        return this. lib.getString();
    };
}
