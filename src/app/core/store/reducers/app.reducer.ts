import { NumberCardModel } from '@app/models';
import * as fromAppActions from '@app.store/actions/app.actions';
import { DataGenerationUtils } from '@app/utils';

const MATRIX_SIZE = 6;
const MIN_NUMBER_VALUE = 1;
const MAX_NUMBER_VALUE = 99;

export interface State {
  numberPairs: Array<NumberCardModel>;
}

const INITIAL_STATE: State = {
  numberPairs: DataGenerationUtils.getNumberCards(
    DataGenerationUtils.getRandomNumbers(MIN_NUMBER_VALUE, MATRIX_SIZE * MATRIX_SIZE, MATRIX_SIZE * MATRIX_SIZE),
    DataGenerationUtils.getRandomNumbers(MIN_NUMBER_VALUE, MAX_NUMBER_VALUE, MATRIX_SIZE * MATRIX_SIZE / 2),
  ),
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
