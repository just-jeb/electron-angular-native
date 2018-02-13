import {Component, Inject} from '@angular/core';
import {LINK_PROVIDERS, LinkProvider} from './link-provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Electron Angular Native starter kit';

  constructor(@Inject(LINK_PROVIDERS) public linkProviders: LinkProvider[]) {
  }
}
