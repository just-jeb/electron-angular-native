import { StringPlugin } from '../../../string-plugin';
import { DynamicLibrary, Library, types } from 'ffi';

export class CppStringPluginProxy implements StringPlugin { 
    simpleDll; 
    constructor(){
        var prefix: String = process.arch == 'x64' ? 'x64/' : "";
        var path = __dirname+'/'+prefix+'Release/simple-dll.dll';
        this.simpleDll = new Library(path, {'getString' : [types.CString, []] });
    }
    getString(): string {    
        return this.simpleDll.getString();
    };
}