import 'reflect-metadata';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { 
  MatIconModule,
  MatIconRegistry,
  MatSnackBar,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatTableModule,
  MatSelectModule,
  MatCardModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatButtonModule,
  MatToolbarModule
 } from '@angular/material';

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
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatOptionModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatButtonModule,
    MatToolbarModule,
    NgReduxModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ 
    AppComponent 
  ],
  providers: [
    MatIconRegistry,
    MatSnackBar,
    AppContext,
    // Store
    NavigationActions
  ]
})
export class AppModule { }