import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {LINK_PROVIDERS} from './link-provider';
import {PrecompiledLibraryLinkService} from './precompiled-library-link.service';
import {NgxElectronModule} from 'ngx-electron';
import {NodeAddonLinkService} from './node-addon-link.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule
  ],
  providers: [
    {
      provide: LINK_PROVIDERS,
      useClass: NodeAddonLinkService,
      multi: true
    },
    {
      provide: LINK_PROVIDERS,
      useClass: PrecompiledLibraryLinkService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

