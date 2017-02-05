import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MaterialModule, MdIconRegistry, OVERLAY_PROVIDERS, MdSnackBar } from '@angular/material';

import { NgReduxModule } from '@angular-redux/store';

// Components
import { AppComponent } from './app.component';

// Meta
import { AppContext } from './app.context';

// Store
import { NavigationActions } from './../store/action/navigation.action';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    NgReduxModule
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
    NavigationActions
  ]
})
export class AppModule { }