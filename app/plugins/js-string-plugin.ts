import { StringPlugin } from '../StringPlugin'

export class JsStringPlugin implements StringPlugin{ 
    getString(): string{
        return "js string";   
    };
}