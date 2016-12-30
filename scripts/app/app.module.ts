import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MaterialModule, MdIconRegistry, OVERLAY_PROVIDERS, MdSnackBar } from '@angular/material';

// Components
import { AppComponent } from './app.component';

// Meta
import { AppContext } from './app.context';

// Store
import { AppRedux } from './../store/app.state';
import { NavigationActions } from './../store/action/navigation.action';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ 
    AppComponent 
  ],
  providers: [
    MdIconRegistry,
    OVERLAY_PROVIDERS,
    MdSnackBar,
    AppContext,
    // Store
    AppRedux,
    NavigationActions
  ]
})
export class AppModule { }