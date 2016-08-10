import { Component } from '@angular/core';

import { StringListComponent } from './string-list.component';
import { PluginsProvider } from './pluginsprovider'

@Component({
  selector: 'my-strings',
  template: `
    <h1>List of loaded strings</h1>
    <string-list></string-list>
    `,
    providers: [PluginsProvider],
    directives: [StringListComponent]
})
export class StringsComponent { }