import { NavigationAction, NavigationActions } from './../action/navigation.action';
import { Navigation } from './../state/navigation';

import _ from 'lodash';

export const INITIAL_STATE: Navigation = new Navigation('connect');

export function navigationReducer(state: Navigation = INITIAL_STATE, action: NavigationAction = null) {
  if (!action) return state;

  switch (action.type) {
    case NavigationActions.NAVIGATION_GO:
      state = _.cloneDeep(state);
      state.address = action.address;
      break;
    case NavigationActions.NAVIGATION_SESSION:
      state = _.cloneDeep(state);
      state.session = action.address;
      break;
    case NavigationActions.NAVIGATION_BACK:
      state = _.cloneDeep(state);
      do {
        state.address = state.history.pop();
      }
      while (action.address && state.address !== action.address && state.history.length > 0)
      if (action.address && state.address != action.address) {
        state.address = action.address;
      }
      break;
  }
  return state;
}