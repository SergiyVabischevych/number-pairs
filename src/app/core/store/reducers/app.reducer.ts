import { NumberCardModel } from '@app/models';
import * as fromAppActions from '@app.store/actions/app.actions';

export interface State {
  numberPairs: Array<NumberCardModel>;
}

const INITIAL_STATE: State = {
  numberPairs: [],
};

export function reducer(state: State = INITIAL_STATE, action: fromAppActions.AppActions): State {

  switch (action.type) {

    case fromAppActions.AppActionTypes.SetNumberPairs: {
      return { ...state, numberPairs: action.payload.pairs };
    }

    default: {
      return state;
    }
  }

}

export const getNumberPairs = (state: State) => state.numberPairs;
