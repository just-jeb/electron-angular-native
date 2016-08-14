import { StringPlugin } from '../string-plugin'

export class JsStringPlugin implements StringPlugin{ 
    getString(): string{
        return "js string";   
    };
}