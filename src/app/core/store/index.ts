import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromAppReducer from './reducers/app.reducer';

export interface State {
  app: fromAppReducer.State;
}

export const appReducers: ActionReducerMap<State> = {
  app: fromAppReducer.reducer,
};

const getAppState = (state: State) => state.app;
export const getNumberPairs = createSelector(getAppState, fromAppReducer.getNumberPairs);
