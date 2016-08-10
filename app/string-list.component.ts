import { Component } from '@angular/core';
import { PluginsProvider } from './pluginsprovider';
import { StringPlugin } from './stringplugin';

@Component({
  selector: 'string-list',
  template: `
    <ul>
      <li *ngFor="let plugin of plugins">
        {{ plugin }}
      </li>
    </ul>
    `
})
export class StringListComponent { 
    plugins: string[];

    constructor(pluginsProvider: PluginsProvider){
        this.plugins = pluginsProvider.getPlugins().map(p => p.getString());
    }

}