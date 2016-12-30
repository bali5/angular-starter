import { Injectable } from '@angular/core';

import { NavigationActions } from './../store/action/navigation.action';

import { AppRedux } from './../store/app.state';
import { INITIAL_STATE, rootReducer } from './../store/root.reducer';

import * as _ from 'lodash';

@Injectable()
export class AppContext {
  constructor(public store: AppRedux, public navigation: NavigationActions) {
    store.configureStore(rootReducer, _.cloneDeep(INITIAL_STATE));

    setTimeout(() => {
      navigation.go('connected');
    }, 2000);
  }

}