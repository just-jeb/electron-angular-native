import { Component } from '@angular/core';
import { StringsComponent } from './strings.component'
@Component({
  selector: 'my-app',
  template: '<my-strings></my-strings>',
  directives: [StringsComponent]
})
export class AppComponent { }