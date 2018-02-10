import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {LINK_PROVIDERS} from './link-provider';
import {PrecompiledLibraryLinkService} from '../native/precompiled-library/precompiled-library-link.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
/*    {
      provide: LINK_PROVIDERS,
      useClass: NodeAddonLinkService,
      multi: true
    },*/
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
