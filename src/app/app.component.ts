import {Component, Inject} from '@angular/core';
import {LINK_PROVIDERS, LinkProvider} from './link-provider';
import * as fs from 'fs';
const blah = fs;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(@Inject(LINK_PROVIDERS) public linkProviders: LinkProvider[]){
  }
}
