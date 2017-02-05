import { NgRedux } from '@angular-redux/store';
import { Navigation } from './state/navigation';
import { Injectable } from '@angular/core';

export interface IAppState {
  navigation: Navigation;
}
