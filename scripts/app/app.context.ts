import { Injectable } from '@angular/core';

import { NavigationActions } from './../store/action/navigation.action';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from './../store/app.state';

import { INITIAL_STATE, rootReducer } from './../store/root.reducer';

import lodash from 'lodash';

const _ = lodash || (<any>window)._;

@Injectable()
export class AppContext {
  constructor(public store: NgRedux<IAppState>, public navigation: NavigationActions) {
    store.configureStore(rootReducer, _.cloneDeep(INITIAL_STATE));

    setTimeout(() => {
      navigation.go('connected');
    }, 2000);
  }

}